# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido.

## Avaliação

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)

## Testes Unitários - Componentes Isolados - API

### Casos de Teste para Model

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| UM-01                   | UserModel          | Verificar a criação de um objeto User com dados válidos. | Dados válidos de um usuário. | Objeto User criado com sucesso. | Passou |
| UM-02                   | UserModel          | Testar validações de campos obrigatórios do modelo User. | Dados incompletos de um usuário. | Erro de validação dos campos. | Falhou |
| UM-03                   | UserModel          | Verificar a atualização de um objeto User existente. | Objeto User existente e novos dados para atualização. | Objeto User atualizado com sucesso. | Passou |
| UM-04                   | UserModel          | Testar exclusão de um objeto User. | Objeto User existente. | Objeto User excluído com sucesso. | Falhou |

### Casos de Teste para Serializer

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| US-01                   | UserSerializer     | Validar a serialização de dados de User. | Objeto User. | Dados serializados corretamente. | Passou |
| US-02                   | UserSerializer     | Testar a desserialização e criação de User a partir de dados JSON válidos. | Dados JSON válidos de um usuário. | Criação de um objeto User com sucesso. | Falhou |
| US-03                   | UserSerializer     | Verificar a desserialização com dados inválidos. | Dados JSON inválidos de um usuário. | Erro de validação ao desserializar. | Passou |
### Casos de Teste para View

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Requisição** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------|--------------------|----------------------------|
| UV-01                   | UserView           | Testar a obtenção de um User específico pela API. | GET request para `/api/users/{id}` com um ID válido. | Dados do User correspondente. | Falhou |
| UV-02                   | UserView           | Verificar a criação de um User via API. | POST request para `/api/users` com dados válidos de um usuário. | User criado com sucesso. | Falhou |
| UV-03                   | UserView           | Testar a atualização de um User via API. | PUT request para `/api/users/{id}` com um ID válido e novos dados. | User atualizado com sucesso. | Passou |
| UV-04                   | UserView           | Verificar a exclusão de um User via API. | DELETE request para `/api/users/{id}` com um ID válido. | Confirmação de exclusão do User. | Passou |

### Casos de Teste para Rotas

| **ID do Caso de Teste** | **Componente** | **Descrição** | **URL** | **Método Esperado** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|---------|---------------------|----------------------------|
| UU-01                   | /users            | Verificar se a URL para a listagem de Users está corretamente configurada. | `/users` | GET | Passou |
| UU-02                   | /users            | Testar a configuração da URL para criação de um novo User. | `/users` | POST | Passou |
| UU-03                   | /users            | Verificar se a URL para detalhes de um User específico está correta. | `/users/{id}` | GET, PUT, DELETE | Passou |


## Testes de Integração - API

### Casos de Teste

| **ID do Caso de Teste** | **Descrição** | **Endpoints** | **Ação** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|---------------|---------------|----------|----------------------|--------------------|----------------------------|
| TI-01                   | Verificar se a criação de um novo usuário via POST reflete corretamente no banco de dados e pode ser recuperado. | `/api/users`, `/api/users/{id}` | Criação e Recuperação | Dados JSON válidos de um usuário. | Usuário criado refletido no DB e recuperável. | Passou |
| TI-02                   | Testar o fluxo completo de atualização de dados de um usuário: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/users/{id}` | Atualização e Verificação | ID de um usuário existente e novos dados JSON. | Dados do usuário atualizados corretamente no DB e na resposta da API. | Passou |
| TI-03                   | Verificar o processo de exclusão de um usuário via DELETE e a tentativa subsequente de recuperação desse usuário. | `/api/users/{id}` | Exclusão e Tentativa de Recuperação | ID de um usuário existente. | Usuário excluído do DB e não encontrável posteriormente. | Passou |
| TI-04                   | Testar a listagem de todos os usuários via GET após a adição de novos usuários para verificar se a listagem está atualizada. | `/api/users`, `/api/users` | Adição e Listagem | Dados JSON válidos de usuários novos. | Listagem de usuários deve incluir os usuários recém-adicionados. | Passou |
| TI-05                   | Verificar o comportamento da API ao tentar realizar operações (GET, PUT, DELETE) em um usuário que não existe. | `/api/users/{id}` | Operações em Usuário Inexistente | ID de um usuário inexistente. | Mensagem de erro adequada para cada operação tentada. | Passou |
| TI-06                   | Testar o processo de autenticação de usuário, incluindo login com credenciais válidas e tentativa de acesso a recursos protegidos sem/ com autenticação. | `/api/login`, `/api/protected-resource` | Autenticação e Acesso | Credenciais de usuário válidas e inválidas. | Acesso concedido apenas após autenticação bem-sucedida; negado sem autenticação. | Passou |
