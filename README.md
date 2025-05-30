# 🧑‍🌾 Sistema de Gestão de Produtores Rurais

Aplicação backend desenvolvida com NestJS para o gerenciamento de produtores rurais, suas propriedades (fazendas), safras e culturas plantadas. A API segue boas práticas de arquitetura em camadas, validações robustas e estrutura modular.

---

## 📦 Tecnologias Utilizadas

- **NestJS** (com TypeORM)
- **PostgreSQL**
- **Swagger (OpenAPI)**
- **Class-validator**
- **Arquitetura em camadas**
- **Docker (opcional)**

---

## 🚀 Funcionalidades

### 👤 Produtor
- Cadastro, edição, listagem e exclusão de produtores rurais
- Validação de CPF ou CNPJ
- Associação com múltiplas fazendas

### 🌾 Fazenda
- Cadastro de fazendas vinculadas a produtores
- Validação da soma de áreas (agricultável + vegetação ≤ total)
- Armazenamento de localização da fazenda (cidade e estado)

### 🌱 Cultura e Safra
- Cadastro de culturas plantadas (ex: soja, milho, café)
- Registro de múltiplas culturas por safra e fazenda
- Associação de culturas plantadas a safras (via tabela `culture_planted`)

### 📊 Dashboard
- Total de fazendas cadastradas
- Total de hectares registrados
- Gráficos:
  - Por estado (quantidade de fazendas)
  - Por cultura plantada (distribuição)
  - Por uso do solo (área agricultável vs vegetação)

---

## 📁 Estrutura do Projeto

```bash
src/
├── modules/
│   ├── producer/
│   ├── farm/
│   ├── culture/
│   ├── harvest/
│   ├── dashboard/
├── shared/
├── main.ts


---

## 🧰 Pré-requisitos

- Node.js v18+
- PostgreSQL ou Docker
- Yarn ou NPM

---

## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
