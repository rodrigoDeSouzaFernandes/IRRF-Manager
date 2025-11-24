# IRRF Manager - Sistema de Gerenciamento de Funcionários

Sistema web desenvolvido em React.js com TypeScript para gerenciar funcionários e calcular o Imposto de Renda Retido na Fonte (IRRF) de cada um deles.

![App demo](src/assets/app.gif)

## Funcionalidades

- **Cadastrar Funcionário**: Modal para cadastro com validação de formulário
- **Editar Funcionário**: Modal para edição de dados do funcionário
- **Excluir Funcionário**: Modal de confirmação para exclusão
- **Listar Funcionários**: Tabela completa com todos os dados e cálculos de IRRF
- **Filtrar Funcionários**: Filtros por Nome e CPF
- **Cálculo Automático de IRRF**: Baseado na tabela progressiva atual
- **Interface Moderna**: UI desenvolvida com Material UI
- **Testes Unitários**: Cobertura de testes com Vitest e React Testing Library

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalação

1. Clone o repositório:

```bash
git clone git@github.com:rodrigoDeSouzaFernandes/IRRF-Manager.git
cd irrf-manager
```

2. Instale as dependências:

```bash
npm install
```

## Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 🧪 Testes

### Executar Testes

```bash
npm test
```

### Executar Testes com UI

```bash
npm run test:ui
```

### Executar Testes com Cobertura

```bash
npm run test:coverage
```

## Cálculo de IRRF

O sistema calcula automaticamente:

**Salário Base IR** = Salário bruto - Desconto da Previdência - (Dedução por Dependente × Quantidade de Dependentes)

**Desconto IRRF** = Salário Base IR × Alíquota - Parcela a Deduzir

### Tabela Progressiva do IRRF

| Base de Cálculo                 | Alíquota | Parcela a Deduzir |
| ------------------------------- | -------- | ----------------- |
| Até R\$ 2.259,20                | Isento   | R$ 0,00           |
| De R\$ 2.259,21 até R$ 2.826,65 | 7,5%     | R$ 169,44         |
| De R\$ 2.826,66 até R$ 3.751,05 | 15%      | R$ 381,44         |
| De R\$ 3.751,06 até R$ 4.664,68 | 22,5%    | R$ 662,77         |
| Acima de R\$ 4.664,68           | 27,5%    | R$ 896,00         |

**Dedução por dependente**: R$ 189,59

## Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Redux Toolkit** - Gerenciamento de estado
- **Material UI** - Biblioteca de componentes React
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Vitest** - Framework de testes
- **React Testing Library** - Utilitários para testes de componentes
