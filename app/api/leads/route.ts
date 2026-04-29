import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, 2000);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract & sanitize required fields
    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const company = sanitize(body.company);
    const message = sanitize(body.message);
    const lead_intent = sanitize(body.lead_intent);

    // Validate required fields
    const errors: Record<string, string> = {};
    if (!name) errors.name = 'Nome é obrigatório';
    if (!email) errors.email = 'Email é obrigatório';
    else if (!isValidEmail(email)) errors.email = 'Email inválido';
    if (!company) errors.company = 'Empresa é obrigatória';
    if (!message) errors.message = 'Mensagem é obrigatória';
    if (!lead_intent) errors.lead_intent = 'Intent é obrigatório';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Optional fields
    const phone = sanitize(body.phone) || null;
    const role = sanitize(body.role) || null;
    const service_interest = sanitize(body.service_interest) || null;
    const lead_source = sanitize(body.lead_source) || null;
    const page_path = sanitize(body.page_path) || null;
    const language = sanitize(body.language) || null;
    const user_agent = sanitize(body.user_agent)?.slice(0, 500) || null;

    // Build metadata with UTM params
    const metadata: Record<string, string> = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    for (const key of utmKeys) {
      const val = sanitize(body[key]);
      if (val) metadata[key] = val;
    }

    // Insert into Supabase via REST API
    const payload = {
      name,
      email,
      phone,
      company,
      role,
      service_interest,
      message,
      lead_intent,
      lead_source,
      page_path,
      language,
      user_agent,
      metadata: Object.keys(metadata).length > 0 ? metadata : {},
    };

    const supabaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/tato_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!supabaseResponse.ok) {
      console.error('Supabase insert error:', supabaseResponse.status, await supabaseResponse.text());
      return NextResponse.json(
        { success: false, message: 'Erro ao salvar. Tente novamente.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno. Tente novamente.' },
      { status: 500 }
    );
  }
}
