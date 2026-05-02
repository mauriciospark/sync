# DOCUMENTO DE ESCOPO - PROJETO SYNC v1.0.0

## 📝 Visão Geral
O projeto SYNC foi concebido para ser a ferramenta definitiva de contagem regressiva da **WINSOFT**. Ele substitui sistemas estáticos por uma engine dinâmica capaz de processar diferenças temporais complexas em tempo real.

## ⚙️ Lógica de Funcionamento

### 1. Motor de Cálculo (The Engine)
O cálculo é baseado na diferença entre o objeto `Date.now()` e o objeto `targetDate` (criado a partir dos inputs do usuário ou carregado do `target.json`/`localStorage`).
- **Conversão:**
  - Dias: `ms / 86,400,000`
  - Horas: `(ms % 86,400,000) / 3,600,000`
  - Minutos: `(ms % 3,600,000) / 60,000`
  - Segundos: `(ms % 60,000) / 1,000`

### 2. Fluxo de Dados
- **Input:** O usuário define a data na coluna esquerda.
- **Processamento:** O JavaScript valida a data e inicia um `setInterval` de 1000ms.
- **Output:** Os elementos do DOM são atualizados com classes de animação (`fade-update`) para suavidade visual.

## 🔧 Guia de Manutenção

### Ajustes de Estilo (`css/styles.css`)
- **Cores:** Procure pelas variáveis de gradiente no `body` e as cores de status (`.status-error`, `.status-success`).
- **Layout:** O controle das colunas está na classe `.split-view`. Altere o `gap` para ajustar o distanciamento.

### Ajustes de Função (`js/script.js`)
- **Configuração:** O objeto `SYNC_CONFIG` no topo do arquivo permite alterar a chave do Storage e o intervalo de atualização.
- **Novas Unidades:** Para adicionar Meses ou Semanas, altere a função `updateDisplay()` e adicione os respectivos seletores no objeto `this.dom`.

---
**PROPRIETÁRIO:** Mauricio Spark  
**MARCA:** WINSOFT  
**LINHAGEM:** SPARK
