# Guia de Deploy Vercel — TATO Digital

Este projeto está configurado para um deploy de alta performance na Vercel. Siga os passos abaixo para colocar o site no ar.

## 1. Estrutura do Projeto
Como o código principal está na pasta `tatodigital/`, você precisa configurar a Vercel para reconhecer essa pasta como a raiz.

- No dashboard da Vercel, ao importar o repositório, clique em **Edit** ao lado de **Root Directory**.
- Selecione a pasta `tatodigital`.

## 2. Variáveis de Ambiente
Você deve configurar as seguintes variáveis no painel da Vercel (**Project Settings > Environment Variables**). Sem elas, o sistema de captura de leads (formulário de contato) não funcionará.

| Nome da Variável | Valor |
|------------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://imgktdgzeqygrlvtnbmc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (Veja seu arquivo .env.local) |

## 3. Configurações de Build
As configurações padrão do Next.js devem funcionar, mas caso precise confirmar:

- **Framework Preset**: `Next.js`
- **Build Command**: `next build`
- **Output Directory**: `.next`

## 4. Domínio e SEO
- O arquivo `public/robots.txt` já foi criado para permitir a indexação pelo Google.
- Certifique-se de configurar seu domínio final (ex: `tatodigital.com.br`) no painel da Vercel para gerar os certificados SSL automaticamente.

## 5. Verificação Local
Antes de subir, você pode rodar o comando de verificação de tipos para garantir que não há erros de lógica:
```bash
cd tatodigital
npx tsc --noEmit
```

---
*Preparado com sucesso para deploy premium.*
