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
| CM-01                   | CaregiverModel          | Verificar a criação de um objeto Caregiver com dados válidos. | Dados válidos de um Caregiver. | Objeto Caregiver criado com sucesso. | Passou |
| CM-02                   | CaregiverModel          | Verificar a criação de um objeto Caregiver com dados invalidos. | Dados invalidos de um Caregiver. | Erro ao criar objeto. | Passou |
| CM-03                   | CaregiverModel          | Testar validações de campos obrigatórios do modelo Caregiver. | Dados incompletos de um usuário. | Erro de validação dos campos. | Passou |
| CM-04                   | CaregiverModel          | Verificar a atualização de um objeto Caregiver existente. | Objeto Caregiver existente e novos dados para atualização. | Objeto Caregiver atualizado com sucesso. | Passou |
| CM-05                   | CaregiverModel          | Verificar a atualização de um objeto Caregiver existente com dados invalidos. | Objeto Caregiver existente e novos dados invalidos para atualização. | Erro ao atualizar objeto. | Passou |
| CM-06                   | CaregiverModel          | Testar exclusão de um objeto Caregiver. | Objeto Caregiver existente. | Objeto Caregiver excluído com sucesso. | Passou |
| CM-07                   | CaregiverModel          | Testar recuperação de um objeto Caregiver. | Objeto Caregiver existente. | Objeto Caregiver recuperado com sucesso. | Passou |
| FDM-01                   | FixedUnavailableDayModel          | Verificar a criação de um objeto FixedUnavailableDay com dados válidos. | Dados válidos de um FixedUnavailableDay. | Objeto FixedUnavailableDay criado com sucesso. | Passou |
| FDM-02                   | FixedUnavailableDayModel          | Testar validações de campos obrigatórios do modelo FixedUnavailableDay. | Dados incompletos de um usuário. | Erro de validação dos campos. | Passou |
| FDM-03                   | FixedUnavailableDayModel          | Verificar a atualização de um objeto FixedUnavailableDay existente. | Objeto FixedUnavailableDay existente e novos dados para atualização. | Objeto FixedUnavailableDay atualizado com sucesso. | Passou |
| FDM-04                   | FixedUnavailableDayModel          | Testar exclusão de um objeto FixedUnavailableDay. | Objeto FixedUnavailableDay existente. | Objeto FixedUnavailableDay excluído com sucesso. | Passou |
| FHM-01                   | FixedUnavailableHourModel          | Verificar a criação de um objeto FixedUnavailableHour com dados válidos. | Dados válidos de um FixedUnavailableHour. | Objeto FixedUnavailableHour criado com sucesso. | Passou |
| FHM-02                   | FixedUnavailableHourModel          | Testar validações de campos obrigatórios do modelo FixedUnavailableHour. | Dados incompletos de um usuário. | Erro de validação dos campos. | Passou |
| FHM-03                   | FixedUnavailableHourModel          | Verificar a atualização de um objeto FixedUnavailableHour existente. | Objeto FixedUnavailableHour existente e novos dados para atualização. | Objeto FixedUnavailableHour atualizado com sucesso. | Passou |
| FHM-04                   | FixedUnavailableHourModel          | Testar exclusão de um objeto FixedUnavailableHour. | Objeto FixedUnavailableHour existente. | Objeto FixedUnavailableHour excluído com sucesso. | Passou |
| FUM-01                   | CustomUnavailableDayModel          | Verificar a criação de um objeto CustomUnavailableDay com dados válidos. | Dados válidos de um CustomUnavailableDay. | Objeto CustomUnavailableDay criado com sucesso. | Passou |
| FUM-02                   | CustomUnavailableDayModel          | Testar validações de campos obrigatórios do modelo CustomUnavailableDay. | Dados incompletos de um usuário. | Erro de validação dos campos. | Passou |
| FUM-03                   | CustomUnavailableDayModel          | Verificar a atualização de um objeto CustomUnavailableDay existente. | Objeto CustomUnavailableDay existente e novos dados para atualização. | Objeto CustomUnavailableDay atualizado com sucesso. | Passou |
| FUM-04                   | CustomUnavailableDayModel          | Testar exclusão de um objeto CustomUnavailableDay. | Objeto CustomUnavailableDay existente. | Objeto CustomUnavailableDay excluído com sucesso. | Passou |
| SM-01 | SpecializationModel | Verificar a criação de um objeto Specialization com dados válidos. | Dados válidos para uma especialização (por exemplo, `name=1`). | Objeto Specialization criado com sucesso. | Passou |
| SM-02 | SpecializationModel | Testar validações de campos obrigatórios do modelo Specialization. | Dados sem o campo `name`. | Erro de validação dos campos. | Passou |
| SM-03 | SpecializationModel | Verificar a atualização de um objeto Specialization existente. | Objeto Specialization existente e novos dados para atualização (por exemplo, `name=2`). | Objeto Specialization atualizado com sucesso. | Passou |
| SM-04 | SpecializationModel | Testar exclusão de um objeto Specialization. | Objeto Specialization existente. | Objeto Specialization excluído com sucesso. | Passou |

### Casos de Teste para Serializer

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| US-01                   | UserSerializer     | Validar a serialização de dados de User. | Objeto User. | Dados serializados corretamente. | Passou |
| US-02                   | UserSerializer     | Testar a desserialização e criação de User a partir de dados JSON válidos. | Dados JSON válidos de um usuário. | Criação de um objeto User com sucesso. | Falhou |
| US-03                   | UserSerializer     | Verificar a desserialização com dados inválidos. | Dados JSON inválidos de um usuário. | Erro de validação ao desserializar. | Passou |
| QS-01                   | QualificationSerializer | Validar a serialização de dados de Qualification. | Objeto Qualification com dados válidos. | Dados serializados corretamente. | Passou |
| QS-02                   | QualificationSerializer | Testar a desserialização e criação de Qualification a partir de dados JSON válidos. | Dados JSON válidos de uma qualificação. | Criação de um objeto Qualification com sucesso. | Passou |
| QS-03                   | QualificationSerializer | Verificar a desserialização com dados de qualificação inválidos. | Dados JSON inválidos de uma qualificação. | Erro de validação ao desserializar. | Passou |
| QS-04                   | QualificationSerializer | Testar a validação do campo 'file' com uma string válida. | String válida para o campo 'file'. | Campo 'file' validado com sucesso. | - |
| QS-05                   | QualificationSerializer | Testar a validação do campo 'file' com um link inválido. | Link inválido para o campo 'file'. | Erro de validação lançado para o campo 'file'. | - |
| QS-06                   | QualificationSerializer | Testar a validação do campo 'file' com um valor que não é uma string. | Valor que não é uma string para o campo 'file'. | Erro de validação lançado para o campo 'file'. | - |
| WS-01                   | WorkExperienceSerializer | Validar a serialização de dados de WorkExperience existente. | Objeto WorkExperience com dados válidos. | Dados serializados corretamente. | Passou |
| WS-02                   | WorkExperienceSerializer | Validar a criação de WorkExperience através do serializer. | Dados válidos para WorkExperience. | Objeto criado corretamente. | Passou |
| WS-03                   | WorkExperienceSerializer | Previnir a criação de WorkExperience através do serializer com dados invalidos. | Dados invalidos para WorkExperience. | Informações sobre o erro e campo relacionado. | Passou |
| WS-04                   | WorkExperienceSerializer | Validar a atualização de WorkExperience através do serializer. | Dados válidos para WorkExperience. | Objeto atualizado corretamente. | Passou |
| FS-01                   | FixedUnavailableDaySerializer | Validar a serialização de dados de FixedUnavailableDay existente. | Objeto FixedUnavailableDay com dados válidos. | Dados serializados corretamente. | Passou |
| FS-02                   | FixedUnavailableDaySerializer | Validar a criação de FixedUnavailableDay através do serializer. | Dados válidos para FixedUnavailableDay. | Objeto criado corretamente. | Passou |
| FS-01                   | FixedUnavailableHourSerializer | Validar a serialização de dados de FixedUnavailableHour existente. | Objeto FixedUnavailableHour com dados válidos. | Dados serializados corretamente. | Passou |
| FS-02                   | FixedUnavailableHourSerializer | Validar a criação de FixedUnavailableHour através do serializer. | Dados válidos para FixedUnavailableHour. | Objeto criado corretamente. | Passou |
| FS-01                   | CustomUnavailableDaySerializer | Validar a serialização de dados de CustomUnavailableDay existente. | Objeto CustomUnavailableDay com dados válidos. | Dados serializados corretamente. | Passou |
| FS-02                   | CustomUnavailableDaySerializer | Validar a criação de CustomUnavailableDay através do serializer. | Dados válidos para CustomUnavailableDay. | Objeto criado corretamente. | Passou |
| CS-01                   | CaregiverSerializer | Validar a serialização de dados de Caregiver existente. | Objeto Caregiver com dados válidos. | Dados serializados corretamente. | Passou |
| CS-02                   | CaregiverSerializer | Validar a criação de Caregiver através do serializer. | Dados válidos para Caregiver. | Objeto criado corretamente. | Passou |
| CS-03                   | CaregiverSerializer | Previnir a criação de Caregiver através do serializer com dados invalidos. | Dados invalidos para Caregiver. | Informações sobre o erro e campo relacionado. | Passou |
| CS-03                   | CaregiverSerializer | Validar a atualização de Caregiver através do serializer. | Dados válidos para Caregiver. | Objeto atualizado corretamente. | Passou |
| SP-01 | SpecializationSerializer | Verificar a serialização de uma instância de especialização com dados válidos. | Instância de `Specialization` com dados válidos. | Dados da especialização serializados corretamente. | Passou |
| SP-02 | SpecializationSerializer` | Testar a criação de uma especialização com dados válidos usando o serializer. | Dados válidos de uma nova especialização. | Nova especialização criada com sucesso.                    | Passou |
| SP-03 | SpecializationSerializer | Testar a criação de uma especialização com dados inválidos usando o serializer. | Dados inválidos para uma nova especialização. | Erro de validação do campo 'nome'. | Passou |
| SP-04 | SpecializationSerializer | Verificar a atualização de uma especialização existente com dados válidos usando o serializer. | Dados válidos para atualizar uma especialização existente. | Especialização existente atualizada com sucesso. | Passou |
| SP-05 | SpecializationSerializer | Testar a atualização de uma especialização com dados inválidos usando o serializer. | Dados inválidos para atualizar uma especialização. | Falha na validação dos dados, impedindo a atualização. | Passou |
| SP-06 | SpecializationSerializer | Verificar a recuperação de todas as especializações cadastradas. | N/A | Lista de todas as especializações cadastradas. | Passou |
| SP-07 | SpecializationSerializer | Testar a recuperação de uma especialização específica pelo nome. | Nome de uma especialização existente. | Especialização específica recuperada com sucesso. | Passou |
| SP-08 | Specialization | Testar a exclusão de uma especialização pelo ID. | ID de uma especialização existente. | Especialização específica excluída com sucesso. | Passou |

### Casos de Teste para View

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Requisição** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------|--------------------|----------------------------|
| UV-01                   | UserView           | Testar a obtenção de um User específico pela API. | GET request para `/api/users/{id}` com um ID válido. | Dados do User correspondente. | Falhou |
| UV-02                   | UserView           | Verificar a criação de um User via API. | POST request para `/api/users` com dados válidos de um usuário. | User criado com sucesso. | Falhou |
| UV-03                   | UserView           | Testar a atualização de um User via API. | PUT request para `/api/users/{id}` com um ID válido e novos dados. | User atualizado com sucesso. | Passou |
| UV-04                   | UserView           | Verificar a exclusão de um User via API. | DELETE request para `/api/users/{id}` com um ID válido. | Confirmação de exclusão do User. | Passou |
| QV-01                   | QualificationView  | Verificar a criação de uma Qualification via API. | POST request para `/api/qualifications` com dados válidos de uma qualificação. | Qualification criada com sucesso. | Passou |
| QV-02                   | QualificationView  | Verificar a criação de uma Qualification via API com dados inválidos. | POST request para `/api/qualifications` com dados inválidos de uma qualificação. | Erro apontando que os dados estão incorretos. | - |
| QV-03                   | QualificationView  | Testar a obtenção de uma Qualification específica pela API. | GET request para `/api/qualifications/<uuid:pk>` com um ID válido. | Dados da Qualification correspondente. | Passou |
| QV-04                   | QualificationView  | Testar a atualização de uma Qualification via API. | PUT request para `/api/qualifications/<uuid:pk>` com um ID válido e novos dados. | Qualification atualizada com sucesso. | Passou |
| QV-05                   | QualificationView  | Testar a atualização de uma Qualification via API com dados inválidos. | PUT request para `/api/qualifications/<uuid:pk>` com um ID válido e novos dados. | Erro apontando que os dados estão incorretos. | - |
| QV-06                   | QualificationView  | Verificar a exclusão de uma Qualification via API. | DELETE request para `/api/qualifications/<uuid:pk>` com um ID válido. | Confirmação de exclusão da Qualification. | Passou |
| QV-07                   | QualificationView  | Testar a obtenção de todas as Qualifications pela API. | GET request para `/api/qualifications`. | Lista de todas as Qualifications. | - |
| CV-01                   | CaregiverListView  | Testar a obtenção de todos os Caregivers pela API. | GET request para `/api/caregiver`. | Lista de todos os Caregivers. | Passou |
| CV-02                   | CaregiverDetailView  | Testar a obtenção de um Caregiver específico pela API. | GET request para `/api/qualifications/<uuid:pk>` com um ID válido. | Dados do Caregiver correspondente. | Passou |
| CV-03                   | CaregiverEditView  | Testar a atualização de um Caregiver via API. | PUT request para `/api/caregiver/` com novos dados. | Caregiver atualizado com sucesso. | Passou |
| CV-04                   | CaregiverEditView  | Testar a atualização de um Caregiver via API com dados inválidos. | PUT request para `/api/caregiver/` com um ID válido e novos dados. | Erro apontando que os dados estão incorretos. | Passou |
| CV-05                   | CaregiverSelfCalendarView  | Testar a obtenção do proprio calendar como Caregiver pela API. | GET request para `/api/caregiver/my-calendar` Estando autenticado como caregiver. | Dados do Caregiver correspondente. | Passou |
| CV-06                   | CaregiverCalendarView  | Testar a obtenção de um Calendar específico pela API. | GET request para `/api/caregiver/<uuid:pk>/calendar` com um ID válido. | Dados do Caregiver correspondente. | Passou |
| SV-01 | SpecializationListCreateView | Testar a listagem de todas as especializações. | GET request para `/api/specializations` | Lista de todas as especializações. | Passou |
| SV-02 | SpecializationListCreateView | Verificar a criação de uma especialização via API. | POST request para `/api/specializations` com dados válidos de uma especialização. | Especialização criada com sucesso. | Passou |
| SV-03 | SpecializationRetrieveUpdateDestroyView | Testar a obtenção de uma especialização específica pela API. | GET request para `/api/specializations/{id}` com um ID válido. | Dados da especialização correspondente. | Passou |
| SV-04 | SpecializationRetrieveUpdateDestroyView | Testar a atualização de uma especialização via API. | PUT request para `/api/specializations/{id}` com um ID válido e novos dados. | Especialização atualizada com sucesso. | Passou |
| SV-05 | SpecializationRetrieveUpdateDestroyView | Verificar a exclusão de uma especialização via API. | DELETE request para `/api/specializations/{id}` com um ID válido. | Confirmação de exclusão da especialização. | Passou |
| SV-06 | SpecializationListView | Testar a listagem de todas as especializações (alternativa). | GET request para `/api/specializations/list` | Lista de todas as especializações. | Passou |

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
| CU-01                   | /caregiver   | Verificar se a URL para a listagem de Caregivers está corretamente configurada. | `/caregiver` | GET | Passou |
| CU-02                   | /caregiver   | Verificar se a URL para atualizar os detalhes de uma Caregiver específica está correta. | `/caregiver/` | PUT | Passou |
| CU-03                   | /caregiver   | Verificar se a URL para detalhes de um Caregiver específico está correta. | `/caregiver/{id}` | GET | Passou |
| CU-04                   | /caregiver   | Verificar se a URL para a para detalhes do Calendar do proprio Caregiver está correta. | `/caregiver/my-calendar` | GET | Passou |
| CU-05                   | /caregiver   | Verificar se a URL para detalhes de um Calendar específico está correta. | `/caregiver/<uuid:pk>/calendar` | GET | Passou |
| SU-01 | specialization/ | Verificar se a URL para listagem e criação de Especializações está corretamente configurada. | `/specialization/` | GET, POST | Passou |
| SU-02 | specialization/<uuid:pk>/ | Testar a configuração da URL para detalhes, atualização e exclusão de uma Especialização específica. | `/specialization/<uuid:pk>/` | GET, PUT, DELETE | Passou |
| SU-03 | specialization/list/ | Verificar se a URL para a listagem de Especializações (alternativa) está correta. | `/specialization/list/` | GET | Passou |


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
| TIQ-04                  | Testar a listagem de todas as qualificações via GET após a adição de novas qualificações para verificar se a listagem está atualizada. | `/api/qualifications`, `/api/qualifications` | Adição e Listagem | Dados JSON válidos de qualificações novas. | Listagem de qualificações deve incluir as qualificações recém-adicionadas. | - |
| TIQ-05                  | Verificar o comportamento da API ao tentar realizar operações (GET, PUT, DELETE) em uma qualificação que não existe. | `/api/qualifications/<uuid:pk>` | Operações em Qualificação Inexistente | ID de uma qualificação inexistente. | Mensagem de erro adequada para cada operação tentada. | - |
| TIQ-06                  | Testar a validação de dados inválidos na criação de uma qualificação. | `/api/qualifications` | Criação | Dados JSON inválidos de uma qualificação | API deve retornar um erro 400 Bad Request | Passou |
| TIC-01                   | Verificar se a criação de um novo Caregiver via POST reflete corretamente no banco de dados e pode ser recuperado. | `/api/users`, `/api/caregiver/<uuid:pk>` | Criação e Recuperação | Dados JSON válidos de um Caregiver. | Caregiver criado refletido no DB e recuperável. | - |
| TIC-02                  | Testar o fluxo completo de atualização de dados de um Caregiver: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/caregiver/`, `/api/caregiver/<uuid:pk>`  | Atualização e Verificação | ID de um Caregiver existente e novos dados JSON. | Dados do Caregiver atualizados corretamente no DB e na resposta da API. | - |
| TIC-03                  | Testar a listagem de todos os Caregivers via GET após a adição de novos Caregivers para verificar se a listagem está atualizada. | `/api/users`, `/api/caregiver` | Criação e Listagem | Dados JSON válidos de Caregivers novos. | Listagem de Caregivers deve incluir os Caregivers recém-adicionados. | - |
| TIC-04                   | Verificar o comportamento da API ao tentar realizar operações (GET) em um Caregiver que não existe. | `/api/caregiver/<uuid:pk>` | Operações em Caregiver Inexistente | ID de um Caregiver inexistente. | Mensagem de erro adequada para cada operação tentada. | - |
| TI-S01 | Verificar se a criação de uma nova especialização via POST reflete corretamente no banco de dados e pode ser recuperada. | `/api/specialization`, `/api/specialization/{uuid}` | Criação e Recuperação  | Dados JSON válidos de uma especialização. | Especialização criada refletida no DB e recuperável. | Passou |
| TI-S02 | Testar a criação de uma especialização com dados inválidos e verificar o tratamento de erro. | `/api/specialization` | Criação com Falha | Dados JSON inválidos de uma especialização. | Resposta de erro HTTP 400 e nenhuma criação no DB. | Passou |
| TI-S03 | Verificar o processo de exclusão de uma especialização via DELETE e a tentativa subsequente de recuperação dessa especialização. | `/api/specialization/{uuid}` | Exclusão e Tentativa de Recuperação | UUID de uma especialização existente. | Especialização excluída do DB e não encontrável posteriormente. | Passou |
| TI-S04 | Testar o fluxo completo de atualização de dados de uma especialização: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/specialization/{uuid}` | Atualização e Verificação | UUID de uma especialização existente e novos dados JSON. | Dados da especialização atualizados corretamente no DB e na resposta da API. | Passou |
| TI-S05 | Testar a atualização de uma especialização com dados inválidos e verificar o tratamento de erro. | `/api/specialization/{uuid}` | Atualização com Falha  | UUID de uma especialização existente e dados JSON inválidos. | Resposta de erro HTTP 400 e nenhuma atualização no DB.  | Passou |
| TI-S06 | Testar a listagem de todas as especializações via GET após a adição de novas especializações para verificar se a listagem está atualizada. | `/api/specialization/list` | Adição e Listagem       | Dados JSON válidos de especializações novas. | Listagem de especializações deve incluir as especializações recém-adicionadas. | Passou |

