# Plano de Testes de Software

## 1. Introdução

### a) Propósito do Sistema
O sistema visa proporcionar uma plataforma para conectar clientes que buscam serviços de cuidadores profissionais, oferecendo uma aplicação fácil de ser usada e segura para ambas as partes.


### b) Referências/documentação do Projeto

- Especificação de Requisitos do Sistema: link para a documentação
- Especificação de Casos de Uso: link para a documentação


## 2. Abordagens de testes

### a) Requisitos Funcionais e Não Funcionais
- Os testes serão realizados para garantir que todos os requisitos funcionais e não funcionais sejam atendidos conforme especificado na documentação.

### Requisitos Funcionais

|ID    | Descrição do Requisito  |
|------|-----------------------------------------|
|RF-01 | A aplicação deve permitir que os usuários façam seus cadastros e login. | 
|RF-02 | A aplicação deve permitir que os usuários adicionem, editem e apaguem suas informações pessoais. | 
|RF-03 | A aplicação deve permitir ao usuário cliente realizar buscas por profissionais de determinada região. |  
|RF-04 | A aplicação deve permitir ao cuidador delimitar sua região de atendimento. | 
|RF-05 | A aplicação deve oferecer recurso de filtragem de profissionais por formação, especialização e/ou tempo de experiência como cuidadores. | 
|RF-06 | A aplicação deve permitir que o cuidador disponibilize suas datas e horários disponíveis para o atendimento. | 
|RF-07 | A aplicação deve permitir que o cliente realize uma avaliação quantitativa e/ou qualitativa dos cuidadores. | 
|RF-08 | A aplicação deve permitir aos usuários clientes a visualização da avaliação atribuída aos cuidadores pelos clientes anteriores. | 
|RF-09 | A aplicação deve permitir que os profissionais insiram seus valores de atendimento.  | 
|RF-10 | A aplicação deve apresentar o valor dos serviços ao cliente no momento da busca.  | 

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |
|-------|-------------------------|
|RNF-01 | A interface da aplicação deve ser intuitiva e fácil de usar para pessoas de todas as idades. | 
|RNF-02 | A aplicação deve ter um desempenho rápido e eficiente. |  
|RNF-03 | A aplicação deve oferecer suporte para a língua portuguesa, garantindo que os usuários possam navegar e utilizar a plataforma em seu idioma nativo. | 
|RNF-04 | A aplicação deve estar acessível e sem interrupções por pelo menos 95% do tempo, apresentando um tempo de inatividade mínimo. | 
|RNF-05 | A aplicação deve assegurar a privacidade e segurança dos dados dos usuários, incluindo informações pessoais e feedback sobre cuidadores, cumprindo com a legislação local de proteção de dados (como LGPD no Brasil) | 
|RNF-06 | A aplicação Web deve ser compatível com os principais navegadores (Google Chrome, Firefox, Edge).  | 
|RNF-07 | A aplicação Mobile deve ser compatível com os sistemas operacionais Android e iOS,  garantindo uma experiência consistente para os usuários. | 


### b) Detalhamento das abordagens de Teste
- Testes de Unidade
- Testes de Integração
- Testes de Sistema e Aceitação
- Testes de Desempenho
- Testes de Usabilidade
- Testes de Disponibilidade
- Testes de Segurança

### c) Ferramentas utilizadas
| Ferramenta | Fabricante   | Versão | Finalidade |
|------------|--------------|--------|------------|
| TestLink   | TestLink.org | 1.9.20 | Gerenciamento de testes |
| Pytest     | Python.org   | 3.12.3 | Testes unitários e de integração |
| Zed Attack Proxy (ZAP) | Zaproxy.org | | Testes de segurança |    

## 3. Ambiente de testes

### a) Definição do ambiente de testes
- Teremos testes unitários desenvolvidos individualmente por desenvolvedores com um volume moderado de dados. Faremos testes de integração com desenvolvedores e analistas de sistema, com um volume moderado de dados, conforme detalhamento a seguir.
- Teremos testes em toda a aplicação com analistas de sistemas e testadores com um volume moderado de dados. Serão utilizados dados reais ou criados na hora. Também teremos testes de aceitação com toda a aplicação, com testadores com um volume moderado de dados reais.
- As máquinas deverão estar em um servidor em nuvem para melhor desempenho, com conexão de internet de no mínimo 100 mb de velocidade, os softwares utilizados para testes serão [........ Mantis para gerenciamento de defeitos, Selenium WebDriver para automação de testes e Jtest para testes estáticos, Netbeans e SQLIte para desenvolvimento do software.......]

## 4. Programação dos testes

### a) Objetivos e Prioridades
. Por meio da API, a aplicação poderá realizar suas atribuições permitindo a realização de requestes de forma eficiente.

. Por meio da aplicação Web e Mobile, os usuários podem:

- Cadastrar-se e realizar login;
- Gerenciar suas informações pessoais;
- Buscar por profissionais em sua região;
- Filtrar profissionais por critérios específicos;
- Visualizar a disponibilidade dos cuidadores;
- Agendar atendimentos;
- Avaliar os serviços prestados;
- Acessar o histórico de avaliações;
- Visualizar o valor dos serviços;
- Manter seus dados pessoais seguros e privados.

## 5. Casos de testes

## Testes Unitários - Componentes Isolados - API

### Casos de Teste para Model

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| QM-01                   | QualificationModel | Verificar a criação de um objeto Qualification com dados válidos. | Dados válidos de uma qualificação. | Objeto Qualification criado com sucesso.	| - |
| QM-02	            	    | QualificationModel | Testar validações de campos obrigatórios do modelo Qualification. | Dados incompletos de uma qualificação. | Erro de validação dos campos. |	- |
| QM-03                   | QualificationModel | Verificar a atualização de um objeto Qualification existente. | Objeto Qualification existente e novos dados para atualização. | Objeto Qualification atualizado com sucesso. | - |
| QM-04                   | QualificationModel | Verificar a recuperação de uma instância de Qualification. | Objeto Qualification criado previamente. | Objeto Qualification recuperado corretamente. | - |
| QM-05                   | QualificationModel | Testar exclusão de um objeto Qualification. | Objeto Qualification existente. | Objeto Qualification excluído com sucesso. | - |
| CM-01                   | CaregiverModel          | Verificar a criação de um objeto Caregiver com dados válidos. | Dados válidos de um Caregiver. | Objeto Caregiver criado com sucesso. | - |
| CM-02                   | CaregiverModel          | Verificar a criação de um objeto Caregiver com dados invalidos. | Dados invalidos de um Caregiver. | Erro ao criar objeto. | - |
| CM-03                   | CaregiverModel          | Testar validações de campos obrigatórios do modelo Caregiver. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| CM-04                   | CaregiverModel          | Verificar a atualização de um objeto Caregiver existente. | Objeto Caregiver existente e novos dados para atualização. | Objeto Caregiver atualizado com sucesso. | - |
| CM-05                   | CaregiverModel          | Verificar a atualização de um objeto Caregiver existente com dados invalidos. | Objeto Caregiver existente e novos dados invalidos para atualização. | Erro ao atualizar objeto. | - |
| CM-06                   | CaregiverModel          | Testar exclusão de um objeto Caregiver. | Objeto Caregiver existente. | Objeto Caregiver excluído com sucesso. | - |
| CM-07                   | CaregiverModel          | Testar recuperação de um objeto Caregiver. | Objeto Caregiver existente. | Objeto Caregiver recuperado com sucesso. | - |
| FDM-01                   | FixedUnavailableDayModel          | Verificar a criação de um objeto FixedUnavailableDay com dados válidos. | Dados válidos de um FixedUnavailableDay. | Objeto FixedUnavailableDay criado com sucesso. | - |
| FDM-02                   | FixedUnavailableDayModel          | Testar validações de campos obrigatórios do modelo FixedUnavailableDay. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| FDM-03                   | FixedUnavailableDayModel          | Verificar a atualização de um objeto FixedUnavailableDay existente. | Objeto FixedUnavailableDay existente e novos dados para atualização. | Objeto FixedUnavailableDay atualizado com sucesso. | - |
| FDM-04                   | FixedUnavailableDayModel          | Testar exclusão de um objeto FixedUnavailableDay. | Objeto FixedUnavailableDay existente. | Objeto FixedUnavailableDay excluído com sucesso. | - |
| FHM-01                   | FixedUnavailableHourModel          | Verificar a criação de um objeto FixedUnavailableHour com dados válidos. | Dados válidos de um FixedUnavailableHour. | Objeto FixedUnavailableHour criado com sucesso. | - |
| FHM-02                   | FixedUnavailableHourModel          | Testar validações de campos obrigatórios do modelo FixedUnavailableHour. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| FHM-03                   | FixedUnavailableHourModel          | Verificar a atualização de um objeto FixedUnavailableHour existente. | Objeto FixedUnavailableHour existente e novos dados para atualização. | Objeto FixedUnavailableHour atualizado com sucesso. | - |
| FHM-04                   | FixedUnavailableHourModel          | Testar exclusão de um objeto FixedUnavailableHour. | Objeto FixedUnavailableHour existente. | Objeto FixedUnavailableHour excluído com sucesso. | - |
| FUM-01                   | CustomUnavailableDayModel          | Verificar a criação de um objeto CustomUnavailableDay com dados válidos. | Dados válidos de um CustomUnavailableDay. | Objeto CustomUnavailableDay criado com sucesso. | - |
| FUM-02                   | CustomUnavailableDayModel          | Testar validações de campos obrigatórios do modelo CustomUnavailableDay. | Dados incompletos de um usuário. | Erro de validação dos campos. | - |
| FUM-03                   | CustomUnavailableDayModel          | Verificar a atualização de um objeto CustomUnavailableDay existente. | Objeto CustomUnavailableDay existente e novos dados para atualização. | Objeto CustomUnavailableDay atualizado com sucesso. | - |
| FUM-04                   | CustomUnavailableDayModel          | Testar exclusão de um objeto CustomUnavailableDay. | Objeto CustomUnavailableDay existente. | Objeto CustomUnavailableDay excluído com sucesso. | - |
| SM-01 | SpecializationModel | Verificar a criação de um objeto Specialization com dados válidos. | Dados válidos para uma especialização (por exemplo, `name=1`). | Objeto Specialization criado com sucesso. | - |
| SM-02 | SpecializationModel | Testar validações de campos obrigatórios do modelo Specialization. | Dados sem o campo `name`. | Erro de validação dos campos. | - |
| SM-03 | SpecializationModel | Verificar a atualização de um objeto Specialization existente. | Objeto Specialization existente e novos dados para atualização (por exemplo, `name=2`). | Objeto Specialization atualizado com sucesso. | - |
| SM-04 | SpecializationModel | Testar exclusão de um objeto Specialization. | Objeto Specialization existente. | Objeto Specialization excluído com sucesso. | - |
| UM-01                   | CustomUserModel       | Verificar a criação de um usuário com dados válidos.                 | Dados válidos para um usuário.                      | Usuário criado com sucesso.                        | -                          |
| UM-02                   | CustomUserModel       | Testar validações de campos obrigatórios do modelo User.             | Dados incompletos ou inválidos de um usuário.       | Erro de validação dos campos.                      | -                          |
| UM-03                   | CustomUserModel       | Verificar a atualização de um usuário existente.                     | Usuário existente e novos dados para atualização.   | Usuário atualizado com sucesso.                    | -                          |
| UM-04                   | CustomUserModel       | Testar exclusão de um usuário.                                       | Usuário existente.                                  | Usuário excluído com sucesso.                      | -                          |
| UM-05                   | CustomUserModel       | Testar recuperação de um usuário.                                    | Usuário existente.                                  | Usuário recuperado com sucesso.                    | -                          |
| CRM-01                   | CareReceiverModel     | Verificar a criação de um CareReceiver com dados válidos.            | Dados válidos para um CareReceiver.                 | CareReceiver criado com sucesso.                   | -                          |
| CRM-02                   | CareReceiverModel     | Testar validações de campos obrigatórios do modelo CareReceiver.     | Dados incompletos de um CareReceiver.               | Erro de validação dos campos.                      | -                          |
| CRM-03                   | CareReceiverModel     | Verificar a atualização de um CareReceiver existente.                | CareReceiver existente e novos dados para atualização. | CareReceiver atualizado com sucesso.            | -                          |
| CRM-04                   | CareReceiverModel     | Testar exclusão de um CareReceiver.                                  | CareReceiver existente.                             | CareReceiver excluído com sucesso.                 | -                          |
| SCM-01                   | SpecialCareModel      | Verificar a criação de um SpecialCare com dados válidos.             | Dados válidos para um SpecialCare.                  | SpecialCare criado com sucesso.                    | -                          |
| SCM-02                   | SpecialCareModel      | Testar exclusão de um SpecialCare.                                   | SpecialCare existente.                              | SpecialCare excluído com sucesso.                  | -                          |
| SCUM-01                  | SpecialCareUserModel  | Verificar a criação de um SpecialCareUser com dados válidos.         | Dados válidos para um SpecialCareUser.              | SpecialCareUser criado com sucesso.                | -                          |
| SCUM-02                  | SpecialCareUserModel  | Testar exclusão de um SpecialCareUser.                               | SpecialCareUser existente.                          | SpecialCareUser excluído com sucesso.              | -                          |
| CRM-01                  | CareRequestModel      | Verificar a criação de um CareRequest com dados válidos.             | Dados válidos para um CareRequest.                  | CareRequest criado com sucesso.                    | -                          |
| CRM-02                  | CareRequestModel      | Testar atualização de um CareRequest.                                | CareRequest existente e novos dados para atualização. | CareRequest atualizado com sucesso.              | -                          |
| CRM-03                  | CareRequestModel      | Testar exclusão de um CareRequest.                                   | CareRequest existente.                              | CareRequest excluído com sucesso.                  | -                          |
| RM-01                   | RatingModel           | Verificar a criação de um Rating com dados válidos.                  | Dados válidos para um Rating.                       | Rating criado com sucesso.                         | -                          |
| RM-02                   | RatingModel           | Testar atualização de um Rating.                                     | Rating existente e novos dados para atualização.    | Rating atualizado com sucesso.                     | -                          |
| RM-03                   | RatingModel           | Testar exclusão de um Rating.                                        | Rating existente.                                   | Rating excluído com sucesso. | -                          |


### Casos de Teste para Serializer

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Entrada Esperada** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------------|--------------------|----------------------------|
| US-01                   | UserSerializer     | Validar a serialização de dados de User. | Objeto User. | Dados serializados corretamente. | - |
| US-02                   | UserSerializer     | Testar a desserialização e criação de User a partir de dados JSON válidos. | Dados JSON válidos de um usuário. | Criação de um objeto User com sucesso. | - |
| US-03                   | UserSerializer     | Verificar a desserialização com dados inválidos. | Dados JSON inválidos de um usuário. | Erro de validação ao desserializar. | - |
| QS-01                   | QualificationSerializer | Validar a serialização de dados de Qualification. | Objeto Qualification com dados válidos. | Dados serializados corretamente. | - |
| QS-02                   | QualificationSerializer | Testar a desserialização e criação de Qualification a partir de dados JSON válidos. | Dados JSON válidos de uma qualificação. | Criação de um objeto Qualification com sucesso. | - |
| QS-03                   | QualificationSerializer | Verificar a serialização com dados de qualificação inválidos. | Dados JSON inválidos de uma qualificação. | Erro de validação ao serializar. | - |
| QS-04                   | QualificationSerializer | Testar a validação do campo 'file' com um link inválido. | Link inválido para o campo 'file'. | Erro de validação lançado para o campo 'file'. | - |
| QS-05                   | QualificationSerializer | Testar a atualização do Serializer com dados válidos. | Dados válidos para atualização. | Qualificação atualizada corretamente. | - |
| QS-06                   | QualificationSerializer | Testar a atualização do Serializer com dados inválidos. | Dados inválidos para atualização. | Qualificação não atualizada. | - |
| WS-01                   | WorkExperienceSerializer | Validar a serialização de dados de WorkExperience existente. | Objeto WorkExperience com dados válidos. | Dados serializados corretamente. | - |
| WS-02                   | WorkExperienceSerializer | Validar a criação de WorkExperience através do serializer. | Dados válidos para WorkExperience. | Objeto criado corretamente. | - |
| WS-03                   | WorkExperienceSerializer | Previnir a criação de WorkExperience através do serializer com dados invalidos. | Dados invalidos para WorkExperience. | Informações sobre o erro e campo relacionado. | - |
| WS-04                   | WorkExperienceSerializer | Validar a atualização de WorkExperience através do serializer. | Dados válidos para WorkExperience. | Objeto atualizado corretamente. | - |
| FS-01                   | FixedUnavailableDaySerializer | Validar a serialização de dados de FixedUnavailableDay existente. | Objeto FixedUnavailableDay com dados válidos. | Dados serializados corretamente. | - |
| FS-02                   | FixedUnavailableDaySerializer | Validar a criação de FixedUnavailableDay através do serializer. | Dados válidos para FixedUnavailableDay. | Objeto criado corretamente. | - |
| FS-01                   | FixedUnavailableHourSerializer | Validar a serialização de dados de FixedUnavailableHour existente. | Objeto FixedUnavailableHour com dados válidos. | Dados serializados corretamente. | - |
| FS-02                   | FixedUnavailableHourSerializer | Validar a criação de FixedUnavailableHour através do serializer. | Dados válidos para FixedUnavailableHour. | Objeto criado corretamente. | - |
| FS-01                   | CustomUnavailableDaySerializer | Validar a serialização de dados de CustomUnavailableDay existente. | Objeto CustomUnavailableDay com dados válidos. | Dados serializados corretamente. | - |
| FS-02                   | CustomUnavailableDaySerializer | Validar a criação de CustomUnavailableDay através do serializer. | Dados válidos para CustomUnavailableDay. | Objeto criado corretamente. | - |
| CS-01                   | CaregiverSerializer | Validar a serialização de dados de Caregiver existente. | Objeto Caregiver com dados válidos. | Dados serializados corretamente. | - |
| CS-02                   | CaregiverSerializer | Validar a criação de Caregiver através do serializer. | Dados válidos para Caregiver. | Objeto criado corretamente. | - |
| CS-03                   | CaregiverSerializer | Previnir a criação de Caregiver através do serializer com dados invalidos. | Dados invalidos para Caregiver. | Informações sobre o erro e campo relacionado. | - |
| CS-03                   | CaregiverSerializer | Validar a atualização de Caregiver através do serializer. | Dados válidos para Caregiver. | Objeto atualizado corretamente. | - |
| SPS-01 | SpecializationSerializer | Verificar a serialização de uma instância de especialização com dados válidos. | Instância de `Specialization` com dados válidos. | Dados da especialização serializados corretamente. | - |
| SPS-02 | SpecializationSerializer | Testar a criação de uma especialização com dados válidos usando o serializer. | Dados válidos de uma nova especialização. | Nova especialização criada com sucesso.                    | - |
| SPS-03 | SpecializationSerializer | Testar a criação de uma especialização com dados inválidos usando o serializer. | Dados inválidos para uma nova especialização. | Erro de validação do campo 'nome'. | - |
| SPS-04 | SpecializationSerializer | Verificar a atualização de uma especialização existente com dados válidos usando o serializer. | Dados válidos para atualizar uma especialização existente. | Especialização existente atualizada com sucesso. | - |
| SPS-05 | SpecializationSerializer | Testar a atualização de uma especialização com dados inválidos usando o serializer. | Dados inválidos para atualizar uma especialização. | Falha na validação dos dados, impedindo a atualização. | - |
| SPS-06 | SpecializationSerializer | Verificar a recuperação de todas as especializações cadastradas. | N/A | Lista de todas as especializações cadastradas. | - |
| SPS-07 | SpecializationSerializer | Testar a recuperação de uma especialização específica pelo nome. | Nome de uma especialização existente. | Especialização específica recuperada com sucesso. | - |
| SP-08 | Specialization | Testar a exclusão de uma especialização pelo ID. | ID de uma especialização existente. | Especialização específica excluída com sucesso. | - |
| US-01                   | UserSerializer              | Validar a serialização de dados de User.                           | Objeto User com dados válidos.                       | Dados serializados corretamente.                     | -                          |
| US-02                   | UserSerializer              | Testar a desserialização e criação de User a partir de dados JSON válidos. | Dados JSON válidos de um usuário.                    | Criação de um objeto User com sucesso.               | -                          |
| US-03                   | UserSerializer              | Testar a atualização do Serializer com dados válidos.              | Dados válidos para atualização.                      | Usuário atualizado corretamente.                     | -                          |
| US-04                   | UserSerializer              | Testar a atualização do Serializer com dados inválidos.            | Dados inválidos para atualização.                    | Falha na atualização devido a dados inválidos.       | -                          |
| CRS-01                  | CareReceiverSerializer      | Validar a serialização de dados de CareReceiver.                   | Objeto CareReceiver com dados válidos.               | Dados serializados corretamente.                     | -                          |
| CRS-02                  | CareReceiverSerializer      | Testar a desserialização e criação de CareReceiver a partir de dados JSON válidos. | Dados JSON válidos de um CareReceiver.              | Criação de um objeto CareReceiver com sucesso.       | -                          |
| CRS-03                  | CareReceiverSerializer      | Testar a atualização do Serializer com dados válidos.              | Dados válidos para atualização.                      | CareReceiver atualizado corretamente.                | -                          |
| CRS-04                  | CareReceiverSerializer      | Testar a atualização do Serializer com dados inválidos.            | Dados inválidos para atualização.                    | Falha na atualização devido a dados inválidos.       | -                          |
| SCS-01                  | SpecialCareSerializer       | Validar a serialização de dados de SpecialCare.                    | Objeto SpecialCare com dados válidos.                | Dados serializados corretamente.                     | -                          |
| SCS-02                  | SpecialCareSerializer       | Testar a desserialização e criação de SpecialCare a partir de dados JSON válidos. | Dados JSON válidos de um SpecialCare.               | Criação de um objeto SpecialCare com sucesso.        | -                          |
| SCUS-01                 | SpecialCareUserSerializer   | Validar a serialização de dados de SpecialCareUser.                | Objeto SpecialCareUser com dados válidos.            | Dados serializados corretamente.                     | -                          |
| SCUS-02                 | SpecialCareUserSerializer   | Testar a desserialização e criação de SpecialCareUser a partir de dados JSON válidos. | Dados JSON válidos de um SpecialCareUser.          | Criação de um objeto SpecialCareUser com sucesso.    | -                          |
| CRS-01                 | CareRequestSerializer       | Validar a serialização de dados de CareRequest.                    | Objeto CareRequest com dados válidos.                | Dados serializados corretamente.                     | -                          |
| CRS-02                 | CareRequestSerializer       | Testar a desserialização e criação de CareRequest a partir de dados JSON válidos. | Dados JSON válidos de um CareRequest.               | Criação de um objeto CareRequest com sucesso.        | -                          |
| RS-01                  | RatingSerializer            | Validar a serialização de dados de Rating.                         | Objeto Rating com dados válidos.                     | Dados serializados corretamente.                     | -                          |
| RS-02                  | RatingSerializer            | Testar a desserialização e criação de Rating a partir de dados JSON válidos. | Dados JSON válidos de um Rating.                    | Criação de um objeto Rating com sucesso.             | -                          |


### Casos de Teste para View

| **ID do Caso de Teste** | **Componente** | **Descrição** | **Requisição** | **Saída Esperada** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|----------------|--------------------|----------------------------|
| QV-01                   | QualificationView  | Verificar a criação de uma Qualification via API. | POST request para `/api/qualifications` com dados válidos de uma qualificação. | Qualification criada com sucesso. | - |
| QV-02                   | QualificationView  | Verificar a criação de uma Qualification via API com dados inválidos. | POST request para `/api/qualifications` com dados inválidos de uma qualificação. | Erro apontando que os dados estão incorretos. | - |
| QV-03                   | QualificationView  | Testar a obtenção de uma Qualification específica pela API. | GET request para `/api/qualifications/<uuid:pk>` com um ID válido. | Dados da Qualification correspondente. | - |
| QV-04                   | QualificationView  | Testar a atualização de uma Qualification via API. | PUT request para `/api/qualifications/<uuid:pk>` com um ID válido e novos dados. | Qualification atualizada com sucesso. | - |
| QV-05                   | QualificationView  | Testar a atualização de uma Qualification via API com dados inválidos. | PUT request para `/api/qualifications/<uuid:pk>` com um ID válido e novos dados. | Erro apontando que os dados estão incorretos. | - |
| QV-06                   | QualificationView  | Verificar a exclusão de uma Qualification via API. | DELETE request para `/api/qualifications/<uuid:pk>` com um ID válido. | Confirmação d
| CV-01                   | CaregiverListView  | Testar a obtenção de todos os Caregivers pela API. | GET request para `/api/caregiver`. | Lista de todos os Caregivers. | - |
| CV-02                   | CaregiverDetailView  | Testar a obtenção de um Caregiver específico pela API. | GET request para `/api/qualifications/<uuid:pk>` com um ID válido. | Dados do Caregiver correspondente. | - |
| CV-03                   | CaregiverEditView  | Testar a atualização de um Caregiver via API. | PUT request para `/api/caregiver/` com novos dados. | Caregiver atualizado com sucesso. | - |
| CV-04                   | CaregiverEditView  | Testar a atualização de um Caregiver via API com dados inválidos. | PUT request para `/api/caregiver/` com um ID válido e novos dados. | Erro apontando que os dados estão incorretos. | - |
| CV-05                   | CaregiverSelfCalendarView  | Testar a obtenção do proprio calendar como Caregiver pela API. | GET request para `/api/caregiver/my-calendar` Estando autenticado como caregiver. | Dados do Caregiver correspondente. | - |
| CV-06                   | CaregiverCalendarView  | Testar a obtenção de um Calendar específico pela API. | GET request para `/api/caregiver/<uuid:pk>/calendar` com um ID válido. | Dados do Caregiver correspondente. | - |
| SV-01 | SpecializationListCreateView | Testar a listagem de todas as especializações. | GET request para `/api/specializations` | Lista de todas as especializações. | - |
| SV-02 | SpecializationListCreateView | Verificar a criação de uma especialização via API. | POST request para `/api/specializations` com dados válidos de uma especialização. | Especialização criada com sucesso. | - |
| SV-03 | SpecializationRetrieveUpdateDestroyView | Testar a obtenção de uma especialização específica pela API. | GET request para `/api/specializations/{id}` com um ID válido. | Dados da especialização correspondente. | - |
| SV-04 | SpecializationRetrieveUpdateDestroyView | Testar a atualização de uma especialização via API. | PUT request para `/api/specializations/{id}` com um ID válido e novos dados. | Especialização atualizada com sucesso. | - |
| SV-05 | SpecializationRetrieveUpdateDestroyView | Verificar a exclusão de uma especialização via API. | DELETE request para `/api/specializations/{id}` com um ID válido. | Confirmação de exclusão da especialização. | - |
| SV-06 | SpecializationListView | Testar a listagem de todas as especializações (alternativa). | GET request para `/api/specializations/list` | Lista de todas as especializações. | - |
| UV-01                   | UserSignupView            | Testar a criação de um novo usuário via API.                             | POST request com dados válidos do usuário. | Usuário criado com sucesso e dados do usuário retornados. | - |
| UV-02                   | UserLoginView             | Testar o processo de login via API com credenciais corretas.             | POST request com credenciais do usuário. | Token de acesso retornado com sucesso.       | - |
| UV-03                   | UserDetailView            | Testar a obtenção de informações de um usuário específico.               | GET request com ID de usuário.     | Dados do usuário específico retornados.      | - |
| UV-04                   | UserUpdateView            | Testar a atualização de informações de um usuário.                       | PUT/PATCH request com novos dados do usuário. | Usuário atualizado com sucesso.             | - |
| UV-05                   | UserDeleteView            | Testar a exclusão de um usuário via API.                                 | DELETE request com ID de usuário.  | Usuário excluído com sucesso.                | - |
| CRV-01                  | CareReceiverCreateView    | Testar a criação de um CareReceiver via API.                             | POST request com dados válidos do CareReceiver. | CareReceiver criado com sucesso.           | - |
| CRV-02                  | CareReceiverDetailView    | Testar a obtenção de informações de um CareReceiver específico.          | GET request com ID de CareReceiver. | Dados do CareReceiver específico retornados. | - |
| SCV-01                  | SpecialCareListView       | Testar a listagem de todas as instâncias SpecialCare.                    | GET request para listar SpecialCare. | Lista de SpecialCare retornada.             | - |
| SCV-02                  | SpecialCareCreateView     | Testar a criação de uma instância SpecialCare via API.                   | POST request com dados válidos de SpecialCare. | SpecialCare criado com sucesso.            | - |
| SCUV-01                 | SpecialCareUserListView   | Testar a listagem de todas as instâncias SpecialCareUser.                | GET request para listar SpecialCareUser. | Lista de SpecialCareUser retornada.        | - |
| SCUV-02                 | SpecialCareUserCreateView | Testar a criação de uma instância SpecialCareUser via API.               | POST request com dados válidos de SpecialCareUser. | SpecialCareUser criado com sucesso.       | - |
| CRV-01                 | CareRequestListView       | Testar a listagem de todas as instâncias CareRequest.                    | GET request para listar CareRequest. | Lista de CareRequest retornada.             | - |
| CRV-02                 | CareRequestCreateView     | Testar a criação de uma instância CareRequest via API.                   | POST request com dados válidos de CareRequest. | CareRequest criado com sucesso.            | - |
| RV-01                  | RatingListView            | Testar a listagem de todas as instâncias Rating.                         | GET request para listar Rating.     | Lista de Rating retornada.                  | - |
| RV-02                  | RatingCreateView          | Testar a criação de uma instância Rating via API.                        | POST request com dados válidos de Rating. | Rating criado com sucesso.                  | - |

<!-- 
### Casos de Teste para Rotas

| **ID do Caso de Teste** | **Componente** | **Descrição** | **URL** | **Método Esperado** | **Estado (Passou/Falhou)** |
|-------------------------|----------------|---------------|---------|---------------------|----------------------------|
| UU-01                   | /users            | Verificar se a URL para a listagem de Users está corretamente configurada. | `/users` | GET | - |
| UU-02                   | /users            | Testar a configuração da URL para criação de um novo User. | `/users` | POST | - |
| UU-03                   | /users            | Verificar se a URL para detalhes de um User específico está correta. | `/users/{id}` | GET, PUT, DELETE | - |
| QU-01                   | /qualifications   | Testar a configuração da URL para criação de uma nova Qualification. | `/qualifications` | POST | - |
| QU-02                   | /qualifications   | Verificar se a URL para mostrar os detalhes de uma Qualification está corretamente configurada. | `/qualifications/<uuid:pk>` | GET | - |
| QU-03                   | /qualifications   | Verificar se a URL para atualizar os detalhes de uma Qualification específica está correta. | `/qualifications/<uuid:pk>` | PUT | - |
| QU-04                   | /qualifications   | Verificar se a URL para a exclusão de uma Qualification específica está correta. | `/qualifications/<uuid:pk>` | DELETE | - |
| CU-01                   | /caregiver   | Verificar se a URL para a listagem de Caregivers está corretamente configurada. | `/caregiver` | GET | - |
| CU-02                   | /caregiver   | Verificar se a URL para atualizar os detalhes de uma Caregiver específica está correta. | `/caregiver/` | PUT | - |
| CU-03                   | /caregiver   | Verificar se a URL para detalhes de um Caregiver específico está correta. | `/caregiver/{id}` | GET | - |
| CU-04                   | /caregiver   | Verificar se a URL para a para detalhes do Calendar do proprio Caregiver está correta. | `/caregiver/my-calendar` | GET | - |
| CU-05                   | /caregiver   | Verificar se a URL para detalhes de um Calendar específico está correta. | `/caregiver/<uuid:pk>/calendar` | GET | - |
| SU-01 | specialization/ | Verificar se a URL para listagem e criação de Especializações está corretamente configurada. | `/specialization/` | GET, POST | - |
| SU-02 | specialization/<uuid:pk>/ | Testar a configuração da URL para detalhes, atualização e exclusão de uma Especialização específica. | `/specialization/<uuid:pk>/` | GET, PUT, DELETE | - |
| SU-03 | specialization/list/ | Verificar se a URL para a listagem de Especializações (alternativa) está correta. | `/specialization/list/` | GET | - | -->


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
| TIQ-04                  | Testar a busca de uma qualificação via GET após ser adicionada ou atualizada. | `/api/qualifications/<uuid:pk>`| Recuperação | Dados JSON válidos de qualificação. | API deve apresentar a qualificação recém-adicionada ou alteradas. | - |
| TIQ-05                  | Verificar o comportamento da API ao tentar realizar operações (GET, PUT, DELETE) em uma qualificação que não existe. | `/api/qualifications/<uuid:pk>` | Operações em Qualificação Inexistente | ID de uma qualificação inexistente. | Mensagem de erro adequada para cada operação tentada. | - |
| TIQ-06                  | Testar a validação de dados inválidos na criação de uma qualificação. | `/api/qualifications` | Criação | Dados JSON inválidos de uma qualificação | API deve retornar um erro 400 Bad Request | - |
| TIC-01                   | Verificar se a criação de um novo Caregiver via POST reflete corretamente no banco de dados e pode ser recuperado. | `/api/users`, `/api/caregiver/<uuid:pk>` | Criação e Recuperação | Dados JSON válidos de um Caregiver. | Caregiver criado refletido no DB e recuperável. | - |
| TIC-02                  | Testar o fluxo completo de atualização de dados de um Caregiver: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/caregiver/`, `/api/caregiver/<uuid:pk>`  | Atualização e Verificação | ID de um Caregiver existente e novos dados JSON. | Dados do Caregiver atualizados corretamente no DB e na resposta da API. | - |
| TIC-03                  | Testar a listagem de todos os Caregivers via GET após a adição de novos Caregivers para verificar se a listagem está atualizada. | `/api/users`, `/api/caregiver` | Criação e Listagem | Dados JSON válidos de Caregivers novos. | Listagem de Caregivers deve incluir os Caregivers recém-adicionados. | - |
| TIC-04                   | Verificar o comportamento da API ao tentar realizar operações (GET) em um Caregiver que não existe. | `/api/caregiver/<uuid:pk>` | Operações em Caregiver Inexistente | ID de um Caregiver inexistente. | Mensagem de erro adequada para cada operação tentada. | - |
| TI-S01 | Verificar se a criação de uma nova especialização via POST reflete corretamente no banco de dados e pode ser recuperada. | `/api/specialization`, `/api/specialization/{uuid}` | Criação e Recuperação  | Dados JSON válidos de uma especialização. | Especialização criada refletida no DB e recuperável. | - |
| TI-S02 | Testar a criação de uma especialização com dados inválidos e verificar o tratamento de erro. | `/api/specialization` | Criação com Falha | Dados JSON inválidos de uma especialização. | Resposta de erro HTTP 400 e nenhuma criação no DB. | - |
| TI-S03 | Verificar o processo de exclusão de uma especialização via DELETE e a tentativa subsequente de recuperação dessa especialização. | `/api/specialization/{uuid}` | Exclusão e Tentativa de Recuperação | UUID de uma especialização existente. | Especialização excluída do DB e não encontrável posteriormente. | - |
| TI-S04 | Testar o fluxo completo de atualização de dados de uma especialização: atualizar via PUT e depois recuperar para verificar a atualização. | `/api/specialization/{uuid}` | Atualização e Verificação | UUID de uma especialização existente e novos dados JSON. | Dados da especialização atualizados corretamente no DB e na resposta da API. | - |
| TI-S05 | Testar a atualização de uma especialização com dados inválidos e verificar o tratamento de erro. | `/api/specialization/{uuid}` | Atualização com Falha  | UUID de uma especialização existente e dados JSON inválidos. | Resposta de erro HTTP 400 e nenhuma atualização no DB.  | - |
| TI-S06 | Testar a listagem de todas as especializações via GET após a adição de novas especializações para verificar se a listagem está atualizada. | `/api/specialization/list` | Adição e Listagem | Dados JSON válidos de especializações novas. | Listagem de especializações deve incluir as especializações recém-adicionadas. | - |
| TIU-01                  | Testar a criação e autenticação de um novo usuário.                            | `/api/register`, `/api/login`                       | Criação e Login                         | Dados válidos para registro e login de um usuário.                        | Usuário criado e autenticado com sucesso.                | -                          |
| TIU-02                  | Testar a atualização e exclusão de um usuário autenticado.                     | `/api/users/{id}`, `/api/logout`                    | Atualização e Exclusão                  | Dados válidos para atualização; Autenticação válida.                     | Usuário atualizado e excluído com sucesso.               | -                          |
| TICR-01                 | Testar o fluxo completo de CareReceiver (criação, atualização, exclusão).      | `/api/carereceivers/`, `/api/carereceivers/{id}`    | CRUD Completo                           | Dados válidos para criação, atualização e ID válido para exclusão.        | CareReceiver criado, atualizado e excluído com sucesso.  | -                          |
| TISC-01                 | Testar a criação e listagem de SpecialCare.                                    | `/api/specialcare/`, `/api/specialcare/{id}`        | Criação e Listagem                      | Dados válidos para criação de SpecialCare.                                | SpecialCare criado e listado com sucesso.                | -                          |
| TISCU-01                | Verificar a integração de SpecialCareUser com a criação e recuperação.         | `/api/specialcareuser/`, `/api/specialcareuser/{id}`| Criação e Recuperação                   | Dados válidos para criação de SpecialCareUser.                            | SpecialCareUser criado e recuperado com sucesso.         | -                          |
| TICRQ-01                | Testar a integração na criação e atualização de CareRequests.                  | `/api/carerequests/`, `/api/carerequests/{id}`      | Criação e Atualização                   | Dados válidos para criação e atualização de CareRequest.                  | CareRequest criado e atualizado com sucesso.            | -                          |
| TIRT-01                 | Verificar a criação e listagem de Ratings.                                     | `/api/ratings/`, `/api/ratings/{id}`                | Criação e Listagem                      | Dados válidos para criação de Rating.                                     | Rating criado e listado com sucesso.                    | -                          |
| TII-01                  | Testar a integração entre a criação de um usuário e a criação de um CareReceiver associado. | `/api/register`, `/api/carereceivers/`              | Criação de usuário e CareReceiver       | Dados válidos para registro de um usuário e criação de um CareReceiver.    | Usuário e CareReceiver associado criados com sucesso.   | -                          |
| TII-02                  | Testar o acesso autenticado a recursos protegidos após o login.                | `/api/login`, `/api/protected-resource`             | Login e Acesso a Recurso Protegido      | Credenciais válidas para login; Acesso a recurso protegido.               | Acesso ao recurso protegido concedido após autenticação. | -                          |
| TII-03                  | Verificar o processo de logout e negação de acesso a recursos protegidos.      | `/api/logout`, `/api/protected-resource`            | Logout e Tentativa de Acesso            | Logout bem-sucedido; Tentativa de acesso a recurso protegido sem login.   | Logout bem-sucedido; Acesso negado ao recurso protegido. | -                          |



<br>

## Casos de testes WEB

### Testes de Sistema e Aceitação

Os Casos de Testes serão realizados utilizando dados Válidos e Inválidos, conforme descritos a seguir:

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-01 - Cadastro de Usuário |RF-01 – A aplicação deve permitir que os usuários façam seus cadastros e login.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os usuários podem se cadastrar na aplicação.|<ol><li>Acessar a página de Login (http://2care.com/Login)</li><li>Clicar no botão o qual gostaria de fazer o cadastro "Cliente" ou "Cuidador"</li><li>A aplicação deve direcionar o usuário para a página de cadastro correto</li><li>Preencher todos os campos obrigatórios com dados válidos.</li><li>Clicar em "Criar conta"</li></ol> | A aplicação deve retornar o usuário para a página de Login.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-02 - Login de Usuário |RF-01 – A aplicação deve permitir que os usuários façam seus cadastros e login.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
| Verificar se os usuários podem fazer o Login na aplicação.|<ol><li>Acessar a página de Login (http://2care.com/Login)</li><li>Preencher o "E-mail" e "Senha" cadastrados.</li><li>Clicar em "Entrar"</li></ol> | A aplicação deve direcionar o usuário para a tela "Cuidadores" já Logado, o que será visivelmente confirmado pela apresentação da foto/Imagem no canto superior esquerdo da tela.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-03 - Cadastro de Usuário com Dados Inválidos |RF-01 – A aplicação deve permitir que os usuários façam seus cadastros e login.|

|Objetivo do teste | Passos | Critérios de êxito|
|-|-|-|
| Verificar se a aplicação nega o cadastro com dados inválidos.|<ol><li>Acessar a página de Login (http://2care.com/Login)</li><li>Clicar no botão o qual gostaria de fazer o cadastro "Cliente" ou "Cuidador"</li><li>A aplicação deve direcionar o usuário para a página de cadastro correto</li><li>Preencher os campos obrigatórios com dados inválidos (ex: e-mail sem formato válido, senha muito curta, etc.)</li><li>Clicar em "Criar conta"</li></ol> | A aplicação deve exibir uma mensagem de erro indicando que os dados fornecidos precisam ser revistos, não permitindo assim o cadastro. |
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-04 - Login de Usuário com Dados Inválidos |RF-01 – A aplicação deve permitir que os usuários façam seus cadastros e login.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se a aplicação nega o login com dados inválidos.|<ol><li>Acessar a página de Login (http://2care.com/Login)</li><li>Preencher o "E-mail" e "Senha" com dados inválidos.</li><li>Clicar em "Entrar"</li></ol> | A aplicação deve exibir uma mensagem de erro indicando que os dados fornecidos são inválidos, não permitindo assim o login do usuário.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-05 - Edição de Informações Pessoais |RF-02 – A aplicação deve permitir que os usuários adicionem, editem e apaguem suas informações pessoais.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os usuários podem editar suas informações pessoais na aplicação.|<ol><li>Acessar a página de Perfil do usuário</li><li>Clicar no botão "Editar perfil"</li><li>Modificar as informações pessoais desejadas</li><li>Clicar em "Salvar"</li></ol> | A aplicação deve atualizar as informações do usuário e exibir uma mensagem de confirmação.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-06 - Busca por Profissionais por Região |RF-03 – A aplicação deve permitir ao usuário cliente realizar buscas por profissionais de determinada região.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os clientes podem encontrar profissionais disponíveis em uma determinada região.|<ol><li>Acessar a página de Busca</li><li>Selecionar a opção de busca por região</li><li>Definir a região desejada</li><li>Clicar em "Aplicar"</li></ol> | A aplicação deve exibir uma lista de profissionais disponíveis na região especificada.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-07 - Delimitação de Região de Atendimento |RF-04 – A aplicação deve permitir ao cuidador delimitar sua região de atendimento.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os cuidadores conseguem delimitar sua região de atendimento na aplicação.|<ol><li>Acessar a página de Perfil</li><li>Localizar a opção de delimitar a região de atendimento</li><li>Definir a área desejada</li><li>Clicar em "Salvar"</li></ol> | A aplicação deve atualizar as configurações da conta do cuidador e exibir uma mensagem de confirmação.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-08 - Filtragem de Profissionais por Critérios |RF-05 – A aplicação deve oferecer recurso de filtragem de profissionais por formação, especialização e/ou tempo de experiência como cuidadores.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os clientes podem filtrar os profissionais de acordo com critérios específicos.|<ol><li>Acessar a página de Busca</li><li>Utilizar os filtros disponíveis para selecionar critérios desejados</li><li>Clicar em "Aplicar Filtros"</li></ol> | A aplicação deve exibir uma lista de profissionais que correspondem aos critérios selecionados.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-09 - Disponibilização de Horários pelos Cuidadores |RF-06 – A aplicação deve permitir que o cuidador disponibilize suas datas e horários disponíveis para o atendimento.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os cuidadores podem disponibilizar seus horários na aplicação.|<ol><li>Acessar a página de Configurações de horários</li><li>Selecionar os horários disponíveis</li><li>Clicar em "Salvar"</li></ol> | A aplicação deve registrar os horários disponíveis do cuidador e exibir uma mensagem de confirmação.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-10 - Avaliação dos Cuidadores pelos Clientes |RF-07 – A aplicação deve permitir que o cliente realize uma avaliação quantitativa e/ou qualitativa dos cuidadores.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os clientes podem avaliar os cuidadores após o atendimento.|<ol><li>Acessar a página de Avaliação</li><li>Selecionar o cuidador a ser avaliado</li><li>Atribuir uma pontuação como base no conceito de estrelas e/ou deixar um comentário</li><li>Clicar em "Enviar Avaliação"</li></ol> | A aplicação deve registrar a avaliação do cliente e exibir uma mensagem de confirmação.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-11 - Visualização da Avaliação dos Cuidadores |RF-08 – A aplicação deve permitir aos usuários clientes a visualização da avaliação atribuída aos cuidadores pelos clientes anteriores.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os clientes podem visualizar as avaliações dos cuidadores.|<ol><li>Acessar a página de Perfil do cuidador</li><li>Localizar a seção de avaliações</li><li>Visualizar as avaliações atribuídas pelos clientes anteriores</li></ol> | A aplicação deve exibir as avaliações dos cuidadores de forma clara e organizada.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-12 - Inserção de Valores de Atendimento pelos Profissionais |RF-09 – A aplicação deve permitir que os profissionais insiram seus valores de atendimento.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os profissionais podem inserir seus valores de atendimento na aplicação.|<ol><li>Acessar a página de Perfil de usuário</li><li>Localizar a opção de inserir valores de atendimento</li><li>Inserir os valores desejados</li><li>Clicar em "Salvar"</li></ol> | A aplicação deve registrar os valores de atendimento do profissional e exibir uma mensagem de confirmação.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-13 - Apresentação dos Valores dos Serviços aos Clientes |RF-10 – A aplicação deve apresentar o valor dos serviços ao cliente no momento da busca.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se os clientes podem visualizar os valores dos serviços durante a busca.|<ol><li>Acessar a página de Busca</li><li>Realizar uma busca por profissionais</li><li>Observar os valores dos serviços exibidos junto aos perfis dos profissionais</li></ol> | A aplicação deve apresentar de forma clara e precisa os valores dos serviços ao cliente.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-RNF01 - Interface Intuitiva |RNF-01 – A interface da aplicação deve ser intuitiva e fácil de usar para pessoas de todas as idades.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se a interface da aplicação é intuitiva para usuários de todas as idades.|<ol><li>Acessar a aplicação</li><li>Explorar as diferentes seções e funcionalidades da interface</li><li>Observar a facilidade de navegação e compreensão das funcionalidades</li></ol> | A aplicação deve ser fácil de usar e entender, mesmo para usuários com pouca experiência em tecnologia.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-RNF02 - Desempenho Rápido |RNF-02 – A aplicação deve ter um desempenho rápido e eficiente.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se a aplicação responde de forma rápida às solicitações dos usuários, não superior a 30 segundos.|<ol><li>Acessar a aplicação</li><li>Realizar diversas ações, como navegar entre páginas e acessar funcionalidades</li><li>Observar o tempo de resposta para cada ação</li></ol> | A aplicação deve responder de maneira ágil, sem atrasos perceptíveis durante o uso normal.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br>  

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-RNF03 - Suporte à Língua Portuguesa |RNF-03 – A aplicação deve oferecer suporte para a língua portuguesa.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se todas as partes da aplicação estão disponíveis em língua portuguesa.|<ol><li>Acessar a aplicação</li><li>Verificar se todos os textos e elementos da interface estão em português</li><li>Explorar diferentes seções e funcionalidades para garantir que todas as partes estejam traduzidas</li></ol> | Todos os elementos da aplicação devem estar corretamente traduzidos para o português e serem compreensíveis para os usuários.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-RNF04 - Disponibilidade Contínua |RNF-04 – A aplicação deve estar acessível por pelo menos 95% do tempo.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se a aplicação está disponível e acessível durante um período prolongado.|<ol><li>Monitorar a aplicação continuamente por um período representativo</li><li>Registrar qualquer tempo de inatividade ou interrupção</li></ol> | A aplicação deve estar disponível por pelo menos 95% do tempo monitorado, conforme especificado.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-RNF05 - Contraste Adequado |RNF-05 – A aplicação deve ter bom nível de contraste entre os elementos da tela.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se todos os elementos da tela têm contraste adequado para uma boa legibilidade.|<ol><li>Acessar a aplicação</li><li>Verificar o contraste entre diferentes elementos, como texto e fundo</li><li>Usar uma ferramenta de análise de contraste para avaliar a conformidade</li></ol> | Todos os elementos da tela devem atender aos padrões de contraste recomendados para garantir uma boa legibilidade.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 

| **Caso de teste** | **Requisitos Associados**|
|--|--|
|CT-RNF06 - Compatibilidade com Navegadores e Sistemas Operacionais |RNF-06 – A aplicação Web deve ser compatível com os principais navegadores e a aplicação Mobile deve ser compatível com os sistemas operacionais Android e iOS.|

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar se a aplicação é compatível com diferentes navegadores e sistemas operacionais.|<ol><li>Acessar a aplicação em diferentes navegadores, como Google Chrome, Firefox e Edge</li><li>Acessar a aplicação em diferentes dispositivos móveis, incluindo Android e iOS</li><li>Explorar diferentes funcionalidades para garantir o funcionamento adequado</li></ol> | A aplicação deve funcionar corretamente em todos os navegadores e sistemas operacionais suportados, sem comprometer a experiência do usuário.|
| Registro da tela: |  | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br> 
 
 ### Testes de Segurança

|Objetivo do teste| Passos | Critérios de êxito|
|-|-|-|
|Verificar o nível de segurança da aplicação.|<ol><li>Baixar a ferramenta Zed Attack Proxy (ZAP) (<https://www.zaproxy.org/>)</li><li>Copie o endereço URL do site 2Care</li><li>Abra a ferramenta ZAP</li><li>Click em "Automated Scan"</li><li>Cole o Endereço URL do site 2Care no campo: "URL to attack"</li><li>Click no botão Attack</li><li>A ferramenta apresentará os "Alertas" de vulnerabilidade a serem observadas e corrigidas</li><li>A ferramenta fornecerá um relatório, para visualizá-lo o tester irá até a barra superior "Relatório" => "Generete Report"</li><li>Configure o tipo de relatório que deseja ser impresso</li><li>Analise os aletas e/ou relatório para buscar sanar as vulnerabilidades.</li></ol> | A aplicação deve apresentar um nível satisfatório de segurança.|
| Registro do Teste |   | Data do Teste: 00/00/2024 - Resultado: " " - "Descrição..." |


<br>

## Métricas para Monitoramento dos Testes

| Métricas | Fórmula | Objetivos |
|----------|---------|-----------|
| Cobertura de Requisitos | (Número de requisitos cobertos / Número total de requisitos) * 100 | Garantir que todos os requisitos sejam testados adequadamente |
| Taxa de Defeitos | (Número de defeitos encontrados / Número total de casos de teste executados) * 100 | Avaliar a eficácia dos testes na detecção de defeitos |
| Cobertura de Código | (Linhas de código testadas / Total de linhas de código) * 100 | Assegurar uma boa cobertura do código para reduzir o risco de falhas |
| Taxa de Execução de Testes Automatizados | (Número de casos de teste automatizados executados / Número total de casos de teste automatizados) * 100 | Garantir uma boa cobertura de teste automatizado e detectar possíveis problemas de automação |
| Tempo Médio para Resolver Defeitos | Soma do tempo de resolução de todos os defeitos / Número total de defeitos resolvidos | Minimizar o tempo de resolução de defeitos para manter o progresso do projeto |

### Monitoramento das Métricas

| Métricas | Medição 1 | Medição 2 | Medição 3 | Medição 4 | Medição 5 | Medição 6 |
|----------|---------|-----------|---------|---------|-----------|-----------|
| Cobertura de Requisitos |   |   |   |   |   |   |
| Taxa de Defeitos        |   |   |   |   |   |   |
| Cobertura de Código     |   |   |   |   |   |   |
| Taxa de Execução de Testes Automatizados  |   |   |   |   |   |   |
| Tempo Médio para Resolver Defeitos |   |   |   |   |   |   |