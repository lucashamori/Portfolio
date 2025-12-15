# Portfólio Pessoal | Lucas Hamori

![GitHub top language](https://img.shields.io/github/languages/top/lucashamori/Portfolio?color=blue&style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/lucashamori/Portfolio?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow?style=for-the-badge)

Este repositório contém o código-fonte do meu portfólio pessoal. O objetivo deste projeto é apresentar meus trabalhos, habilidades e experiências profissionais, além de demonstrar conhecimentos técnicos em desenvolvimento web moderno.

🔗 **Acesse o projeto online:** [lucashamori.github.io/Portfolio](https://lucashamori.github.io/Portfolio)

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

* **[Next.js 15](https://nextjs.org/)**: Framework React para produção, utilizado com **App Router**.
* **[React](https://reactjs.org/)**: Biblioteca para construção de interfaces de usuário.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
* **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilitários CSS para estilização rápida e responsiva.
* **GitHub Pages**: Plataforma de hospedagem estática.
* **GitHub Actions**: Automação de CI/CD para deploy automático.

## ⚙️ Configurações Importantes (GitHub Pages)

Como este projeto é hospedado no **GitHub Pages** (que serve arquivos estáticos), foram necessárias configurações específicas no `next.config.ts`:

1.  **Static Export (`output: 'export'`)**: Configura o Next.js para gerar arquivos HTML/CSS/JS estáticos em vez de depender de um servidor Node.js.
2.  **Base Path**: Configurado para `/Portfolio` para garantir que os assets (CSS, imagens) sejam carregados corretamente na sub-pasta do GitHub.
3.  **Image Optimization**: A otimização padrão de imagens do Next.js foi desativada (`unoptimized: true`) pois requer processamento no servidor, o que não é suportado nativamente no plano gratuito do GitHub Pages.

## 📦 Como rodar o projeto localmente

Siga os passos abaixo para baixar e executar o projeto na sua máquina:

### Pré-requisitos
* Node.js instalado (versão 18 ou superior recomendada).

### Passo a passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/lucashamori/Portfolio.git](https://github.com/lucashamori/Portfolio.git)
    ```

2.  **Entre na pasta do projeto:**
    ```bash
    cd Portfolio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Acesse `http://localhost:3000` no seu navegador.

## 🛠️ Build e Deploy

Para gerar a versão de produção localmente (simulando o que o GitHub Actions faz):

```bash
npm run build
