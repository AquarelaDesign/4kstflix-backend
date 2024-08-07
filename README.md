# 4KSTFlix

Bem-vindo ao 4KSTFLIX (back-end)!

Este é um aplicativo web back-end criado usando Sequelize + Express + MySQL

## Lista de recursos:

### Recurso 1: Autenticação do usuário

- Os usuários podem criar uma conta para acessar o conteúdo principal do site.
- Os usuários podem fazer login/logout e persistir suas sessões em diferentes páginas e recarregamentos de página.
- Os usuários podem atualizar seus detalhes pessoais na página da conta.
- Existe um usuário de demonstração disponível para fornecer fácil acesso à exploração da funcionalidade completa do site.

### Recurso 2: Página inicial (Em desenvolvimento)

- Os usuários conectados podem visualizar uma coleção de filmes/programas classificados por categorias (ou seja, tendências, mais populares).
- O conteúdo é gerado dinamicamente buscando dados de uma API de terceiros.
- Os usuários podem clicar em um título para visualizar um trailer.

### Recurso 3: Perfis e listas (Em desenvolvimento)

- Cada usuário pode criar vários perfis.
- Cada perfil pode definir um nome personalizado e selecionar uma imagem em uma lista de imagens de perfil.
- Cada perfil pode adicionar ou remover vídeos da lista de observação para vê-los posteriormente.
- Perfis e listas de observação persistem entre os logins.

</br>

## Rotas Backend:

| Method | Path                      | Purpose                                       |
| ------ | ------------------------- | --------------------------------------------- |
| POST   | /api/users/signup         | Criar Usuário                                 |
| GET    | /api/users                | Obtem todos os Usuários                       |
| POST   | /api/session/login        | Login do Usuário                              |
| GET    | /api/session              | Obtem o Usuário atual                         |
| DELETE | /api/session/logout       | Logout do Usuário                             |
| GET    | /api/content/gender/movie | Obtem a lista de Categorias de Filmes         |
| GET    | /api/content/gender/tv    | Obtem a lista de Categorias de Programs de TV |
| GET    | /api/content/:contentId   | Busca conteúdo pela Categoria                 |

<br></br>
\*\* As demais rotas estão em desenvolvimento
<br></br>

## Atribuição de dados de Filmes e Programs de TV:

### Todos os dados de filme/TV são fornecidos e de propriedade da API do banco de dados de filmes.

### [ -- Confira aqui --](https://www.themoviedb.org/)

---

![TMDB](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg)
