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
| QM-01                   | QualificationModel | Verificar a criação de um objeto Qualification com dados válidos. | Dados válidos de uma qualificação. | Objeto Qualification criado com sucesso.	| Passou |
| QM-02	            	  | QualificationModel | Testar validações de campos obrigatórios do modelo Qualification. | Dados incompletos de uma qualificação. | Erro de validação dos campos. | Passou |
| QM-03			          | QualificationModel | Verificar a atualização de um objeto Qualification existente. | Objeto Qualification existente e novos dados para atualização. | Objeto Qualification atualizado com sucesso. | Passou |
| QM-04			          | QualificationModel | Testar exclusão de um objeto Qualification. | Objeto Qualification existente. | Objeto Qualification excluído com sucesso. | Passou |
| QM-05                   | QualificationModel | Verificar a representação de string do objeto Qualification. | Objeto Qualification com dados válidos. | String formatada corretamente com nome e data de conclusão. | Passou |


### Casos de Teste para Serializer

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| US-01                   | UserSerializer     | Validar a serialização de dados de User. | Objeto User. | Dados serializados corretamente. | Passou |
| US-02                   | UserSerializer     | Testar a desserialização e criação de User a partir de dados JSON válidos. | Dados JSON válidos de um usuário. | Criação de um objeto User com sucesso. | Falhou |
| US-03                   | UserSerializer     | Verificar a desserialização com dados inválidos. | Dados JSON inválidos de um usuário. | Erro de validação ao desserializar. | Passou |
| QS-01                   | QualificationSerializer | Validar a serialização de dados de Qualification. | Objeto Qualification com dados válidos. | Dados serializados corretamente. | Passou |
| QS-02                   | QualificationSerializer | Testar a desserialização e criação de Qualification a partir de dados JSON válidos. | Dados JSON válidos de uma qualificação. | Criação de um objeto Qualification com sucesso. | Passou |
| QS-03                   | QualificationSerializer | Verificar a desserialização com dados de qualificação inválidos. | Dados JSON inválidos de uma qualificação. | Erro de validação ao desserializar. | Passou |
| QS-04                   | QualificationSerializer | Testar a validação do campo 'file' com uma string válida. | String válida para o campo 'file'. | Campo 'file' validado com sucesso. | Passou |
| QS-05                   | QualificationSerializer | Testar a validação do campo 'file' com um link inválido. | Link inválido para o campo 'file'. | Erro de validação lançado para o campo 'file'. | Passou |
| QS-06                   | QualificationSerializer | Testar a validação do campo 'file' com um valor que não é uma string. | Valor que não é uma string para o campo 'file'. | Erro de validação lançado para o campo 'file'. | Passou |


### Casos de Teste para View

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Requisição** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------|--------------------|----------------------------|
| UV-01                   | UserView           | Testar a obtenção de um User específico pela API. | GET request para `/api/users/{id}` com um ID válido. | Dados do User correspondente. | Falhou |
| UV-02                   | UserView           | Verificar a criação de um User via API. | POST request para `/api/users` com dados válidos de um usuário. | User criado com sucesso. | Falhou |
| UV-03                   | UserView           | Testar a atualização de um User via API. | PUT request para `/api/users/{id}` com um ID válido e novos dados. | User atualizado com sucesso. | Passou |
| UV-04                   | UserView           | Verificar a exclusão de um User via API. | DELETE request para `/api/users/{id}` com um ID válido. | Confirmação de exclusão do User. | Passou |
| QV-01                   | QualificationView  | Verificar a criação de uma Qualification via API. | POST request para `/api/qualifications` com dados válidos de uma qualificação. | Qualification criada com sucesso. | - |
| QV-02                   | QualificationView  | Verificar a criação de uma Qualification via API com dados inválidos. | POST request para `/api/qualifications` com dados inválidos de uma qualificação. | Erro apontando que os dados estão incorretos. | - |
| QV-03                   | QualificationView  | Testar a obtenção de uma Qualification específica pela API. | GET request para `/api/qualifications/<uuid:pk>` com um ID válido. | Dados da Qualification correspondente. | - |
| QV-04                   | QualificationView  | Testar a atualização de uma Qualification via API. | PUT request para `/api/qualifications/<uuid:pk>` com um ID válido e novos dados. | Qualification atualizada com sucesso. | - |
| QV-05                   | QualificationView  | Testar a atualização de uma Qualification via API com dados inválidos. | PUT request para `/api/qualifications/<uuid:pk>` com um ID válido e novos dados. | Erro apontando que os dados estão incorretos. | - |
| QV-06                   | QualificationView  | Verificar a exclusão de uma Qualification via API. | DELETE request para `/api/qualifications/<uuid:pk>` com um ID válido. | Confirmação de exclusão da Qualification. | - |
| QV-07                   | QualificationView  | Testar a obtenção de todas as Qualifications pela API. | GET request para `/api/qualifications`. | Lista de todas as Qualifications. | - |



### Casos de Teste para Rotas

| **ID do Caso de Teste** | **Componente** | **Descrição** | **URL** | **Método Esperado** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|---------|---------------------|----------------------------|
| UU-01                   | /users            | Verificar se a URL para a listagem de Users está corretamente configurada. | `/users` | GET | Passou |
| UU-02                   | /users            | Testar a configuração da URL para criação de um novo User. | `/users` | POST | Passou |
| UU-03                   | /users            | Verificar se a URL para detalhes de um User específico está correta. | `/users/{id}` | GET, PUT, DELETE | Passou |
| QU-01                   | /qualifications   | Testar a configuração da URL para criação de uma nova Qualification. | `/qualifications` | POST | Passou |
| QU-02                   | /qualifications   | Verificar se a URL para a listagem de Qualifications está corretamente configurada. | `/qualifications` | GET | Passou |
| QU-03                   | /qualifications   | Verificar se a URL para atualizar os detalhes de uma Qualification específica está correta. | `/qualifications/<uuid:pk>` | PUT | Passou |
| QU-04                   | /qualifications   | Verificar se a URL para a exclusão de uma Qualification específica está correta. | `/qualifications/<uuid:pk>` | DELETE | Passou |


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
| TIQ-01                  | Verificar se a criação de uma nova qualificação via POST reflete corretamente no banco de dados e pode ser recuperada. | `/api/qualifications`, `/api/qualifications/<uuid:pk>` | Criação e Recuperação | Dados JSON válidos de uma qualificação. | Qualificação criada refletida no DB e recuperável. | Passou |
| TIQ-02                  | Testar o fluxo completo de atualização de dados de uma qualificação: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/qualifications/<uuid:pk>` | Atualização e Verificação | ID de uma qualificação existente e novos dados JSON. | Dados da qualificação atualizados corretamente no DB e na resposta da API. | Passou |
| TIQ-03                  | Verificar o processo de exclusão de uma qualificação via DELETE e a tentativa subsequente de recuperação dessa qualificação. | `/api/qualifications/<uuid:pk>` | Exclusão e Tentativa de Recuperação | ID de uma qualificação existente. | Qualificação excluída do DB e não encontrável posteriormente. | Passou |
| TIQ-04                  | Testar a listagem de todas as qualificações via GET após a adição de novas qualificações para verificar se a listagem está atualizada. | `/api/qualifications`, `/api/qualifications` | Adição e Listagem | Dados JSON válidos de qualificações novas. | Listagem de qualificações deve incluir as qualificações recém-adicionadas. | Passou |
| TIQ-05                  | Verificar o comportamento da API ao tentar realizar operações (GET, PUT, DELETE) em uma qualificação que não existe. | `/api/qualifications/<uuid:pk>` | Operações em Qualificação Inexistente | ID de uma qualificação inexistente. | Mensagem de erro adequada para cada operação tentada. | Passou |
| TIQ-06                  | Testar a validação de dados inválidos na criação de uma qualificação. | `/api/qualifications` | Criação | Dados JSON inválidos de uma qualificação | API deve retornar um erro 400 Bad Request | Passou |