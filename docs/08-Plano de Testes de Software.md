# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.
 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Testes Unitários - Componentes Isolados - API

### Casos de Teste para Model

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| UM-01                   | UserModel          | Verificar a criação de um objeto User com dados válidos. | Dados válidos de um usuário. | Objeto User criado com sucesso. | - |
| UM-02                   | UserModel          | Testar validações de campos obrigatórios do modelo User. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| UM-03                   | UserModel          | Verificar a atualização de um objeto User existente. | Objeto User existente e novos dados para atualização. | Objeto User atualizado com sucesso. | - |
| UM-04                   | UserModel          | Testar exclusão de um objeto User. | Objeto User existente. | Objeto User excluído com sucesso. | - |
| QM-01                   | QualificationModel | Verificar a criação de um objeto Qualification com dados válidos. | Dados válidos de uma qualificação. | Objeto Qualification criado com sucesso.	| - |
| QM-02	            	  | QualificationModel | Testar validações de campos obrigatórios do modelo Qualification. | Dados incompletos de uma qualificação. | Erro de validação dos campos. |	- |
| QM-03			          | QualificationModel | Verificar a atualização de um objeto Qualification existente. | Objeto Qualification existente e novos dados para atualização. | Objeto Qualification atualizado com sucesso. | - |
| QM-04			          | QualificationModel | Testar exclusão de um objeto Qualification. | Objeto Qualification existente. | Objeto Qualification excluído com sucesso. | - |
| QM-05                   | QualificationModel | Verificar a representação de string do objeto Qualification. | Objeto Qualification com dados válidos. | String formatada corretamente com nome e data de conclusão. | - |
| CM-01                   | Caregiver          | Verificar a criação de um objeto Caregiver com dados válidos. | Dados válidos de um Caregiver. | Objeto Caregiver criado com sucesso. | - |
| CM-02                   | Caregiver          | Testar validações de campos obrigatórios do modelo Caregiver. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| CM-03                   | Caregiver          | Verificar a atualização de um objeto Caregiver existente. | Objeto Caregiver existente e novos dados para atualização. | Objeto Caregiver atualizado com sucesso. | - |
| CM-04                   | Caregiver          | Testar exclusão de um objeto Caregiver. | Objeto Caregiver existente. | Objeto Caregiver excluído com sucesso. | - |
| FDM-01                   | FixedUnavailableDay          | Verificar a criação de um objeto FixedUnavailableDay com dados válidos. | Dados válidos de um FixedUnavailableDay. | Objeto FixedUnavailableDay criado com sucesso. | - |
| FDM-02                   | FixedUnavailableDay          | Testar validações de campos obrigatórios do modelo FixedUnavailableDay. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| FDM-03                   | FixedUnavailableDay          | Verificar a atualização de um objeto FixedUnavailableDay existente. | Objeto FixedUnavailableDay existente e novos dados para atualização. | Objeto FixedUnavailableDay atualizado com sucesso. | - |
| FDM-04                   | FixedUnavailableDay          | Testar exclusão de um objeto FixedUnavailableDay. | Objeto FixedUnavailableDay existente. | Objeto FixedUnavailableDay excluído com sucesso. | - |
| FHM-01                   | FixedUnavailableHour          | Verificar a criação de um objeto FixedUnavailableHour com dados válidos. | Dados válidos de um FixedUnavailableHour. | Objeto FixedUnavailableHour criado com sucesso. | - |
| FHM-02                   | FixedUnavailableHour          | Testar validações de campos obrigatórios do modelo FixedUnavailableHour. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| FHM-03                   | FixedUnavailableHour          | Verificar a atualização de um objeto FixedUnavailableHour existente. | Objeto FixedUnavailableHour existente e novos dados para atualização. | Objeto FixedUnavailableHour atualizado com sucesso. | - |
| FHM-04                   | FixedUnavailableHour          | Testar exclusão de um objeto FixedUnavailableHour. | Objeto FixedUnavailableHour existente. | Objeto FixedUnavailableHour excluído com sucesso. | - |
| FUM-01                   | CustomUnavailableDay          | Verificar a criação de um objeto CustomUnavailableDay com dados válidos. | Dados válidos de um CustomUnavailableDay. | Objeto CustomUnavailableDay criado com sucesso. | - |
| FUM-02                   | CustomUnavailableDay          | Testar validações de campos obrigatórios do modelo CustomUnavailableDay. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| FUM-03                   | CustomUnavailableDay          | Verificar a atualização de um objeto CustomUnavailableDay existente. | Objeto CustomUnavailableDay existente e novos dados para atualização. | Objeto CustomUnavailableDay atualizado com sucesso. | - |
| FUM-04                   | CustomUnavailableDay          | Testar exclusão de um objeto CustomUnavailableDay. | Objeto CustomUnavailableDay existente. | Objeto CustomUnavailableDay excluído com sucesso. | - |



### Casos de Teste para Serializer

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| US-01                   | UserSerializer     | Validar a serialização de dados de User. | Objeto User. | Dados serializados corretamente. | - |
| US-02                   | UserSerializer     | Testar a desserialização e criação de User a partir de dados JSON válidos. | Dados JSON válidos de um usuário. | Criação de um objeto User com sucesso. | - |
| US-03                   | UserSerializer     | Verificar a desserialização com dados inválidos. | Dados JSON inválidos de um usuário. | Erro de validação ao desserializar. | - |
| QS-01                   | QualificationSerializer | Validar a serialização de dados de Qualification. | Objeto Qualification com dados válidos. | Dados serializados corretamente.       | - |
| QS-02                   | QualificationSerializer | Testar a desserialização e criação de Qualification a partir de dados JSON válidos. | Dados JSON válidos de uma qualificação. | Criação de um objeto Qualification com sucesso. | - |
| QS-03                   | QualificationSerializer | Verificar a desserialização com dados de qualificação inválidos. | Dados JSON inválidos de uma qualificação. | Erro de validação ao desserializar. | - |
| QS-04                   | QualificationSerializer | Testar a validação do campo 'file' com uma string válida. | String válida para o campo 'file'. | Campo 'file' validado com sucesso. | - |
| QS-05                   | QualificationSerializer | Testar a validação do campo 'file' com um link inválido. | Link inválido para o campo 'file'. | Erro de validação lançado para o campo 'file'. | - |
| QS-06                   | QualificationSerializer | Testar a validação do campo 'file' com um valor que não é uma string. | Valor que não é uma string para o campo 'file'. | Erro de validação lançado para o campo 'file'. | - |
| WS-01                   | WorkExperience | Validar a serialização de dados de WorkExperience existente. | Objeto WorkExperience com dados válidos. | Dados serializados corretamente. | - |
| WS-02                   | WorkExperience | Validar a criação de WorkExperience através do serializer. | Dados válidos para WorkExperience. | Objeto criado corretamente. | - |
| WS-03                   | WorkExperience | Previnir a criação de WorkExperience através do serializer com dados invalidos. | Dados invalidos para WorkExperience. | Informações sobre o erro e campo relacionado. | - |
| WS-04                   | WorkExperience | Validar a atualização de WorkExperience através do serializer. | Dados válidos para WorkExperience. | Objeto atualizado corretamente. | - |
| FS-01                   | FixedUnavailableDay | Validar a serialização de dados de FixedUnavailableDay existente. | Objeto FixedUnavailableDay com dados válidos. | Dados serializados corretamente. | - |
| FS-02                   | FixedUnavailableDay | Validar a criação de FixedUnavailableDay através do serializer. | Dados válidos para FixedUnavailableDay. | Objeto criado corretamente. | - |
| FS-01                   | FixedUnavailableHour | Validar a serialização de dados de FixedUnavailableHour existente. | Objeto FixedUnavailableHour com dados válidos. | Dados serializados corretamente. | - |
| FS-02                   | FixedUnavailableHour | Validar a criação de FixedUnavailableHour através do serializer. | Dados válidos para FixedUnavailableHour. | Objeto criado corretamente. | - |
| FS-01                   | CustomUnavailableDay | Validar a serialização de dados de CustomUnavailableDay existente. | Objeto CustomUnavailableDay com dados válidos. | Dados serializados corretamente. | - |
| FS-02                   | CustomUnavailableDay | Validar a criação de CustomUnavailableDay através do serializer. | Dados válidos para CustomUnavailableDay. | Objeto criado corretamente. | - |
| CS-01                   | Caregiver | Validar a serialização de dados de Caregiver existente. | Objeto Caregiver com dados válidos. | Dados serializados corretamente. | - |
| CS-02                   | Caregiver | Validar a criação de Caregiver através do serializer. | Dados válidos para Caregiver. | Objeto criado corretamente. | - |
| CS-03                   | Caregiver | Previnir a criação de Caregiver através do serializer com dados invalidos. | Dados invalidos para Caregiver. | Informações sobre o erro e campo relacionado. | - |
| CS-03                   | Caregiver | Validar a atualização de Caregiver através do serializer. | Dados válidos para Caregiver. | Objeto atualizado corretamente. | - |

### Casos de Teste para View

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Requisição** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------|--------------------|----------------------------|
| UV-01                   | UserView           | Testar a obtenção de um User específico pela API. | GET request para `/api/users/{id}` com um ID válido. | Dados do User correspondente. | - |
| UV-02                   | UserView           | Verificar a criação de um User via API. | POST request para `/api/users` com dados válidos de um usuário. | User criado com sucesso. | - |
| UV-03                   | UserView           | Testar a atualização de um User via API. | PUT request para `/api/users/{id}` com um ID válido e novos dados. | User atualizado com sucesso. | - |
| UV-04                   | UserView           | Verificar a exclusão de um User via API. | DELETE request para `/api/users/{id}` com um ID válido. | Confirmação de exclusão do User. | - |
| QV-01                   | QualificationView  | Verificar a criação de uma Qualification via API. | POST request para `/api/qualifications` com dados válidos de uma qualificação. | Qualification criada com sucesso. | - |
| QV-02                   | QualificationView  | Verificar a criação de uma Qualification via API com dados inválidos. | POST request para `/api/qualifications` com dados inválidos de uma qualificação. | Erro apontando que os dados estão incorretos. | - |
| QV-03                   | QualificationView  | Testar a obtenção de uma Qualification específica pela API. | GET request para `/api/qualifications/<uuid:pk>` com um ID válido. | Dados da Qualification correspondente. | - |
| QV-04                   | QualificationView  | Testar a atualização de uma Qualification via API. | PUT request para `/api/qualifications/<uuid:pk>` com um ID válido e novos dados. | Qualification atualizada com sucesso. | - |
| QV-05                   | QualificationView  | Testar a atualização de uma Qualification via API com dados inválidos. | PUT request para `/api/qualifications/<uuid:pk>` com um ID válido e novos dados. | Erro apontando que os dados estão incorretos. | - |
| QV-06                   | QualificationView  | Verificar a exclusão de uma Qualification via API. | DELETE request para `/api/qualifications/<uuid:pk>` com um ID válido. | Confirmação de exclusão da Qualification. | - |
| QV-07                   | QualificationView  | Testar a obtenção de todas as Qualifications pela API. | GET request para `/api/qualifications`. | Lista de todas as Qualifications. | - |
| CV-01                   | CaregiverListView  | Testar a obtenção de todos os Caregivers pela API. | GET request para `/api/caregiver`. | Lista de todos os Caregivers. | - |
| CV-02                   | CaregiverDetailView  | Testar a obtenção de um Caregiver específico pela API. | GET request para `/api/qualifications/<uuid:pk>` com um ID válido. | Dados do Caregiver correspondente. | - |
| CV-03                   | CaregiverEditView  | Testar a atualização de um Caregiver via API. | PUT request para `/api/caregiver/` com novos dados. | Caregiver atualizado com sucesso. | - |
| CV-04                   | CaregiverEditView  | Testar a atualização de um Caregiver via API com dados inválidos. | PUT request para `/api/caregiver/` com um ID válido e novos dados. | Erro apontando que os dados estão incorretos. | - |
| CV-05                   | CaregiverSelfCalendarView  | Testar a obtenção do proprio calendar como Caregiver pela API. | GET request para `/api/caregiver/my-calendar` Estando autenticado como caregiver. | Dados do Caregiver correspondente. | - |
| CV-06                   | CaregiverCalendarView  | Testar a obtenção de um Calendar específico pela API. | GET request para `/api/caregiver/<uuid:pk>/calendar` com um ID válido. | Dados do Caregiver correspondente. | - |

### Casos de Teste para Rotas

| **ID do Caso de Teste** | **Componente** | **Descrição** | **URL** | **Método Esperado** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|---------|---------------------|----------------------------|
| UU-01                   | /users            | Verificar se a URL para a listagem de Users está corretamente configurada. | `/users` | GET | - |
| UU-02                   | /users            | Testar a configuração da URL para criação de um novo User. | `/users` | POST | - |
| UU-03                   | /users            | Verificar se a URL para detalhes de um User específico está correta. | `/users/{id}` | GET, PUT, DELETE | - |
| QU-01                   | /qualifications   | Testar a configuração da URL para criação de uma nova Qualification. | `/qualifications` | POST | - |
| QU-02                   | /qualifications   | Verificar se a URL para a listagem de Qualifications está corretamente configurada. | `/qualifications` | GET | - |
| QU-03                   | /qualifications   | Verificar se a URL para atualizar os detalhes de uma Qualification específica está correta. | `/qualifications/<uuid:pk>` | PUT | - |
| QU-04                   | /qualifications   | Verificar se a URL para a exclusão de uma Qualification específica está correta. | `/qualifications/<uuid:pk>` | DELETE | - |
| CU-01                   | /caregiver   | Verificar se a URL para a listagem de Caregivers está corretamente configurada. | `/caregiver` | GET | - |
| CU-02                   | /caregiver   | Verificar se a URL para atualizar os detalhes de uma Caregiver específica está correta. | `/caregiver/` | PUT | - |
| CU-03                   | /caregiver   | Verificar se a URL para detalhes de um Caregiver específico está correta. | `/caregiver/{id}` | GET | - |
| CU-04                   | /caregiver   | Verificar se a URL para a para detalhes do Calendar do proprio Caregiver está correta. | `/caregiver/my-calendar` | GET | - |
| CU-05                   | /caregiver   | Verificar se a URL para detalhes de um Calendar específico está correta. | `/caregiver/<uuid:pk>/calendar` | GET | - |

## Testes de Integração - API

### Casos de Teste

| **ID do Caso de Teste** | **Descrição** | **Endpoints** | **Ação** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|---------------|---------------|----------|----------------------|--------------------|----------------------------|
| TI-01                   | Verificar se a criação de um novo usuário via POST reflete corretamente no banco de dados e pode ser recuperado. | `/api/users`, `/api/users/{id}` | Criação e Recuperação | Dados JSON válidos de um usuário. | Usuário criado refletido no DB e recuperável. | - |
| TI-02                   | Testar o fluxo completo de atualização de dados de um usuário: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/users/{id}` | Atualização e Verificação | ID de um usuário existente e novos dados JSON. | Dados do usuário atualizados corretamente no DB e na resposta da API. | - |
| TI-03                   | Verificar o processo de exclusão de um usuário via DELETE e a tentativa subsequente de recuperação desse usuário. | `/api/users/{id}` | Exclusão e Tentativa de Recuperação | ID de um usuário existente. | Usuário excluído do DB e não encontrável posteriormente. | - |
| TI-04                   | Testar a listagem de todos os usuários via GET após a adição de novos usuários para verificar se a listagem está atualizada. | `/api/users`, `/api/users` | Adição e Listagem | Dados JSON válidos de usuários novos. | Listagem de usuários deve incluir os usuários recém-adicionados. | - |
| TI-05                   | Verificar o comportamento da API ao tentar realizar operações (GET, PUT, DELETE) em um usuário que não existe. | `/api/users/{id}` | Operações em Usuário Inexistente | ID de um usuário inexistente. | Mensagem de erro adequada para cada operação tentada. | - |
| TI-06                   | Testar o processo de autenticação de usuário, incluindo login com credenciais válidas e tentativa de acesso a recursos protegidos sem/ com autenticação. | `/api/login`, `/api/protected-resource` | Autenticação e Acesso | Credenciais de usuário válidas e inválidas. | Acesso concedido apenas após autenticação bem-sucedida; negado sem autenticação. | - |
| TIQ-01                  | Verificar se a criação de uma nova qualificação via POST reflete corretamente no banco de dados e pode ser recuperada. | `/api/qualifications`, `/api/qualifications/<uuid:pk>` | Criação e Recuperação | Dados JSON válidos de uma qualificação. | Qualificação criada refletida no DB e recuperável. | - |
| TIQ-02                  | Testar o fluxo completo de atualização de dados de uma qualificação: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/qualifications/<uuid:pk>` | Atualização e Verificação | ID de uma qualificação existente e novos dados JSON. | Dados da qualificação atualizados corretamente no DB e na resposta da API. | - |
| TIQ-03                  | Verificar o processo de exclusão de uma qualificação via DELETE e a tentativa subsequente de recuperação dessa qualificação. | `/api/qualifications/<uuid:pk>` | Exclusão e Tentativa de Recuperação | ID de uma qualificação existente. | Qualificação excluída do DB e não encontrável posteriormente. | - |
| TIQ-04                  | Testar a listagem de todas as qualificações via GET após a adição de novas qualificações para verificar se a listagem está atualizada. | `/api/qualifications`, `/api/qualifications` | Adição e Listagem | Dados JSON válidos de qualificações novas. | Listagem de qualificações deve incluir as qualificações recém-adicionadas. | - |
| TIQ-05                  | Verificar o comportamento da API ao tentar realizar operações (GET, PUT, DELETE) em uma qualificação que não existe. | `/api/qualifications/<uuid:pk>` | Operações em Qualificação Inexistente | ID de uma qualificação inexistente. | Mensagem de erro adequada para cada operação tentada. | - |
| TIQ-06                  | Testar a validação de dados inválidos na criação de uma qualificação. | `/api/qualifications` | Criação | Dados JSON inválidos de uma qualificação | API deve retornar um erro 400 Bad Request | - |
| TIC-01                   | Verificar se a criação de um novo Caregiver via POST reflete corretamente no banco de dados e pode ser recuperado. | `/api/users`, `/api/caregiver/<uuid:pk>` | Criação e Recuperação | Dados JSON válidos de um Caregiver. | Caregiver criado refletido no DB e recuperável. | - |
| TIC-02                  | Testar o fluxo completo de atualização de dados de um Caregiver: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/caregiver/`, `/api/caregiver/<uuid:pk>`  | Atualização e Verificação | ID de um Caregiver existente e novos dados JSON. | Dados do Caregiver atualizados corretamente no DB e na resposta da API. | - |
| TIC-03                  | Testar a listagem de todos os Caregivers via GET após a adição de novos Caregivers para verificar se a listagem está atualizada. | `/api/users`, `/api/caregiver` | Criação e Listagem | Dados JSON válidos de Caregivers novos. | Listagem de Caregivers deve incluir os Caregivers recém-adicionados. | - |
| TIC-04                   | Verificar o comportamento da API ao tentar realizar operações (GET) em um Caregiver que não existe. | `/api/caregiver/<uuid:pk>` | Operações em Caregiver Inexistente | ID de um Caregiver inexistente. | Mensagem de erro adequada para cada operação tentada. | - |