# SYNC - Sistema de Temporização Dinâmica

![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0.0-blue)
![Linhagem](https://img.shields.io/badge/Linhagem-SPARK-red)

O **SYNC** é um temporizador regressivo dinâmico e universal projetado para oferecer precisão absoluta no gerenciamento cronológico de eventos futuros. Desenvolvido com uma arquitetura modular e interface de alta performance, o sistema permite a sincronização exata do tempo restante para qualquer data alvo definida.

## 🚀 Funcionalidades

- **Definição Manual Dinâmica:** Interface intuitiva para inserção de dia, mês, ano, horas e minutos.
- **Cálculo em Tempo Real:** Motor JavaScript de alta precisão que converte milissegundos em Dias, Horas, Minutos e Segundos.
- **Persistência de Dados:** Integração com `localStorage` para manter a contagem ativa mesmo após o fechamento do navegador.
- **Layout Split View:** Painel de configuração à esquerda e relógio dinâmico à direita para feedback instantâneo.
- **Responsividade Total:** Interface adaptável para desktops, tablets e smartphones.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica e moderna.
- **CSS3 (Flexbox/Grid):** Design responsivo com efeitos de *glassmorphism* e animações fluidas.
- **JavaScript Vanilla:** Lógica de temporização pura, sem dependências externas.
- **JSON:** Estrutura de dados para metadados e persistência de estado.

## 📦 Estrutura do Projeto

```text
/sync
  ├── index.html        # Interface Principal
  ├── css/
  │   └── styles.css    # Estilização e Animações
  ├── js/
  │   └── script.js    # Motor de Temporização (Engine)
  └── data/
      └── target.json   # Estrutura de Metadados
```

## 💻 Como Rodar o Projeto

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Não é necessário servidor backend, o projeto funciona puramente no lado do cliente (Client-side).

---
**LINHAGEM SPARK**  
*Desenvolvido por Mauricio Spark*
