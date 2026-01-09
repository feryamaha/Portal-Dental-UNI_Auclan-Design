# Acessibilidade por Teclado - Análise e Implementação

## Status Atual: ⏸️ IMPLEMENTAÇÃO PAUSADA (05 jan 2026)

Data da última revisão: 05 de janeiro de 2026

> **Resumo**  
> - Toda a lógica de acessibilidade via teclado que estava espalhada pelos componentes foi removida temporariamente para evitar uso indevido.  
> - Foi criado o hook `useKeyboardAccessibility.hook.ts` (ainda não aplicado) para centralizar futura implementação.  
> - A próxima etapa é reintroduzir acessibilidade seguindo esse novo padrão único.

---

## 1. O Que Existe ✅

### Situação Atual (05 jan 2026)
- **Button.tsx / FloatingLabelInput.tsx** mantêm apenas o comportamento nativo padrão do navegador.
- **Outros componentes (SliderControl, Dropdown, Sidebar, Topbar, etc.)** estão sem lógica de acessibilidade customizada até que o novo hook seja aplicado.

### Hook Centralizado Criado
- Arquivo: `src/hooks/hooks-dash/hooks-UI-UX/useKeyboardAccessibility.hook.ts`
- Responsável por:
  - Handlers padrão para Enter/Espaço/Setas/Escape.
  - Gestão opcional de focus trap e autofocus inicial.
  - Aplicação dos estilos de foco seguindo o design system (via `clsx` + `twMerge`).
  - Retorno de `interactiveProps` para serem espalhados em qualquer elemento clicável não nativo.

---

## 2. O Que Falta ❌

### 2.1 Navegação por Teclado Incompleta

#### DropInput (CRÍTICO)
```
Problema: Dropdown não é navegável com setas (↑↓)
Arquivo: src/components/ui/DropInput.tsx
Hook: src/hooks/hooks-dash/hooks-UI-UX/useDropInput.hook.ts

Falta:
- ArrowUp/ArrowDown para navegar opções
- Enter para selecionar
- Escape já existe ✓
```

#### Dropdown (CRÍTICO)
```
Problema: Sem navegação por teclado
Arquivo: src/components/ui/Dropdown.tsx
Hook: src/hooks/hooks-dash/hooks-UI-UX/useDropdownMenu.hook.ts

Falta:
- ArrowUp/ArrowDown para navegar itens
- Enter para selecionar
- Escape para fechar
```

#### SliderBanner (MÉDIO)
```
Problema: Sem suporte a setas para navegar slides
Arquivo: src/components/shared-dashboard/SliderBanner.tsx

Falta:
- ArrowLeft/ArrowRight para navegar slides
- Space para play/pause
```

### 2.2 Ordem de Tabulação (Tabindex)

**Problema Global:** Nenhum componente usa `tabindex` explícito

```
Impacto:
- Ordem natural do DOM pode estar incorreta
- Modais não têm focus trap
- Elementos ocultos podem receber foco
```

**Exemplos:**
- `SectionContentRight.tsx` (Modal de login) - Sem focus trap
- `Topbar.tsx` - Ordem de foco pode estar errada
- `Sidebar.tsx` - Ordem de foco pode estar errada

### 2.3 Focus Visible (Indicador Visual)

**Falta em:**
- Buttons em `Topbar.tsx` - Sem `focus-visible`
- Links em `Sidebar.tsx` - Sem `focus-visible`
- Buttons em `Dropdown.tsx` - Sem `focus-visible`
- Buttons de ícone - Sem `focus-visible`

**Exemplo do que falta:**
```typescript
// ❌ ERRADO
<button className="...">Click</button>

// ✅ CORRETO
<button className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
  Click
</button>
```

### 2.4 Aria Attributes Faltando

#### aria-expanded
```
Falta em: DropInput, Dropdown
Deve indicar se o dropdown está aberto/fechado
```

#### aria-label em Botões de Ícone
```
Falta em:
- Topbar: Botões de ação (notificações, perfil)
- Sidebar: Botões de ação
- SliderControl: Alguns botões

Exemplo:
<button aria-label="Abrir notificações">
  <Icon name="bell" />
</button>
```

#### aria-pressed em Toggle Buttons
```
Falta em: SliderControl (play/pause)
Deve indicar estado do botão toggle
```

#### role="button" em Divs Clicáveis
```
Inconsistente em:
- SliderControl: Alguns divs têm, outros não
- DropInput: Alguns divs clicáveis sem role
```

### 2.5 Submissão via Enter

**Problema:** Formulários não validam Enter em todos os campos

```
Arquivo: src/components/shared-tela-login/LoginFormFields.tsx

Falta:
- Validação de Enter em FloatingLabelInput
- Validação de Enter em DropInput
- Focus automático em campo com erro
```

---

## 3. Checklist de Implementação

### Prioridade 🔴 ALTA (Crítico)

- [ ] **DropInput** - Adicionar navegação por setas (↑↓)
- [ ] **DropInput** - Adicionar `aria-expanded`
- [ ] **Dropdown** - Adicionar navegação por teclado completa
- [ ] **Modal (Login)** - Implementar focus trap
- [ ] **Formulário** - Validar Enter em todos os campos

### Prioridade 🟡 MÉDIA (Importante)

- [ ] **Topbar/Sidebar** - Adicionar `focus-visible` em links
- [ ] **Buttons** - Adicionar `focus-visible` em todos
- [ ] **SliderBanner** - Adicionar setas para navegar
- [ ] **Buttons de ícone** - Adicionar `aria-label`
- [ ] **SliderControl** - Adicionar `aria-pressed` em toggle

### Prioridade 🟢 BAIXA (Melhorias)

- [ ] **Tabindex** - Revisar ordem de tabulação em páginas
- [ ] **Aria-label** - Completar em todos os elementos interativos
- [ ] **Keyboard shortcuts** - Documentar atalhos (Esc, Enter, etc)

---

## 4. Padrões de Implementação

### Navegação em Dropdown com Setas

```typescript
// Hook deve suportar:
const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault()
            setHighlightedIndex((prev) => (prev + 1) % options.length)
            break
        case 'ArrowUp':
            e.preventDefault()
            setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length)
            break
        case 'Enter':
            e.preventDefault()
            handleSelect(options[highlightedIndex].value)
            break
        case 'Escape':
            setIsOpen(false)
            break
    }
}
```

### Focus Visible em Componentes

```typescript
// Padrão para todos os elementos interativos
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
```

### Focus Trap em Modais

```typescript
// Implementar em SectionContentRight
useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements?.[0] as HTMLElement
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault()
                lastElement?.focus()
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault()
                firstElement?.focus()
            }
        }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
}, [])
```

### Aria-expanded em Dropdowns

```typescript
<button
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    onClick={handleToggle}
>
    {displayValue}
</button>
```

---

## 5. Testes de Acessibilidade

### Teste Manual - Navegação por Teclado

```bash
# 1. Abrir página
yarn dev

# 2. Pressionar Tab repetidamente
# Verificar se todos os elementos interativos recebem foco

# 3. Testar Enter em formulários
# Verificar se submete ao pressionar Enter

# 4. Testar Escape em modais/dropdowns
# Verificar se fecha corretamente

# 5. Testar setas em dropdowns
# Verificar se navega entre opções
```

### Ferramentas Recomendadas

- **axe DevTools** - Verificar violações de acessibilidade
- **WAVE** - Avaliar contraste e estrutura
- **Lighthouse** - Auditoria de acessibilidade
- **Screen Reader** - NVDA (Windows) ou VoiceOver (Mac)

---

## 6. Próximos Passos (Atualizado)

1. Aplicar gradualmente o `useKeyboardAccessibility` nos componentes que antes tinham lógica própria (SliderControl, Dropdown, DropInput, modais, etc.).
2. Reintroduzir estilos de foco reutilizando os tokens fornecidos pelo hook (neutral/form).
3. Reativar navegação por teclado em Dropdown/DropInput usando o hook como orquestrador.
4. Reaplicar focus trap em modais através das opções do hook.
5. Revisar ARIA (`aria-label`, `aria-expanded`, `aria-pressed`, etc.) usando a API do hook para manter consistência.
6. Atualizar os componentes documentados (Sidebar, Topbar, ShortcutCard, etc.) para importar o hook e remover duplicação.

---

**Última atualização:** 31 de dezembro de 2025

**Status:** ⚠️ Acessibilidade por teclado precisa de implementação urgente em componentes críticos.
