# PF Prime Premium — site

Site estático (HTML/CSS/JS puro, sem build), no mesmo padrão técnico do site Pai e Filho: GTM, eventos de WhatsApp/telefone no dataLayer, banner de cookies, política de privacidade, schema LocalBusiness + FAQPage, sitemap e robots.

Escopo: somente eletrodomésticos de linha premium (cocção, refrigeração, lava-louças e exaustão). Visual black premium (preto, grafite e dourado champanhe).

## Estrutura

```
index.html        → página inicial
servicos.html     → linhas atendidas, uma seção por categoria (âncoras #refrigeracao, #cooktop, #fornos, #cozinha, #coifas, #adegas)
contato.html      → formulário que abre o WhatsApp já preenchido
privacidade.html  → política de privacidade (LGPD)
style.css         → todo o visual (layout e cores)
motion.css        → animações: entrada da hero, reveal ao rolar, faixa de marcas, reflexo nos botões, contadores
motion.js         → ativa as animações (reveal, marquee das marcas, contadores). Sem JS, o conteúdo fica visível
main.js           → menu mobile, banner de cookies, formulário → WhatsApp, eventos do GTM
robots.txt, sitemap.xml, favicon.svg
IMAGENS/          → logo (logo-pf-prime.png), foto de destaque (cozinha-destaque.jpg) e ilustrações SVG dos equipamentos
```

## Antes de publicar (obrigatório)

Pontos que são placeholders ou que dependem de confirmação sua:

1. **Telefone e WhatsApp**: usei o mesmo número do site Pai e Filho, `(31) 99124-8002` (`5531991248002`). Se a PF Prime Premium tiver linha própria, troque em todos os HTMLs e em `main.js` (`WHATSAPP_NUMBER`).
2. **Google Tag Manager**: `GTM-XXXXXXX` em todas as páginas. Use o contêiner da PF Prime Premium, ou remova o bloco se não for usar.
3. **Domínio**: o site está configurado para `www.pfprimepremium.com.br` (canonical, og:url, sitemap, robots). Se o domínio for outro, troque em todos os arquivos. Não há CNAME nesta versão; crie um quando o domínio for definido.
4. **Nome da marca**: usei "PF Prime Premium" (conforme o registro de campanha desta conta). Confirme se o nome final é esse.
5. **Garantia de 90 dias**: copiada da política do Pai e Filho. Confirme se é a mesma para a PF Prime Premium.
6. **Marcas atendidas**: a lista (Miele, Bosch, Siemens, Electrolux, Samsung, LG, Brastemp, KitchenAid, Smeg, Fisher & Paykel) precisa ser confirmada com a sua operação. Não use a palavra "autorizada" sem comprovação.
7. **Bairros e área de atendimento**: a lista é sugestão. Confirme o que você cobre de fato.
8. **Política de privacidade**: preencha o nome e o CNPJ do responsável (seção 8) e a data de atualização.
9. **Depoimentos**: não há depoimentos nesta versão de propósito. Depoimentos de exemplo apresentados como reais violam as políticas do Google. Quando tiver relatos reais, inclua com autorização.
10. **AdSense**: não incluído. Quando for ativar, adicione o script de verificação e o `ads.txt` com o Publisher ID.

## Como publicar

- **GitHub Pages**: crie um repositório, suba os arquivos na raiz (sem subpastas) e ative Pages em Settings > Pages, branch `main`, pasta `/ (root)`.
- Para domínio próprio, crie o arquivo `CNAME` com o domínio, configure os registros DNS e marque Enforce HTTPS.
- Depois, cadastre o domínio no Google Search Console e envie o `sitemap.xml`.

## Como ajustar

- Cores e fontes: variáveis no topo de `style.css` (`--gold`, `--black`, etc.).
- Mensagem padrão do WhatsApp: `WHATSAPP_MSG` em `main.js` e os links `wa.me` nos HTMLs.
