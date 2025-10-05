# MAPSCLEAN - Guia de Deploy

## 1) Repositório
- [ ] Fazer push do código para GitHub (mapsclean-web)

## 2) Vercel
- [ ] Importar repositório e criar projeto
- [ ] Adicionar Environment Variables:
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE_APP_ID
  - NEXT_PUBLIC_API_BASE_URL
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (opcional)
- [ ] Deploy → obter URL de preview

## 3) Domínio (GoDaddy)
- [ ] A (@) → 76.76.21.21
- [ ] CNAME (www) → cname.vercel-dns.com
- [ ] Em Vercel → Project Settings → Domains:
  - Adicionar www.mapsclean.com e mapsclean.com
  - Definir www.mapsclean.com como Primary
  - Aguardar emissão de SSL

## 4) Firebase Auth
- [ ] Authentication → Settings → Authorized Domains:
  - www.mapsclean.com, mapsclean.com, URL de preview

## 5) Google OAuth
- [ ] console.cloud.google.com → APIs & Services:
  - Authorized JavaScript origins:
    - https://www.mapsclean.com
  - Authorized redirect URIs:
    - https://www.mapsclean.com/__/auth/handler

## 6) Apple Sign In (opcional)
- [ ] Firebase → Authentication → Apple → Configure
- [ ] Apple Developer:
  - Service ID, Team ID, Key ID
  - Inserir arquivo public/.well-known/apple-developer-domain-association.txt

## 7) SEO & Assets
- [ ] robots.txt e sitemap.xml (já criados)
- [ ] Favicon e Open Graph

## 8) Testes finais
- [ ] Home, Services, Pricing, Login, Account
- [ ] Autenticação Google/Apple
- [ ] HTTPS/SSL ativo
