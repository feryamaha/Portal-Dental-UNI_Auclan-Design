// Hooks 100% reutilizáveis em QUALQUER portal
// Lógica que realmente vai se repetir em beneficiário, dentista, empresa, comercial, representante

export { usePortalDetector } from './usePortalDetector.hook'
export { useDashboardTopbar } from './useDashboardTopbar.hook'
export { useShortcutsSection } from './useShortcutsSection.hook'

// Alias para compatibilidade com código antigo
export { usePortalDetector as useDashboardSidebar } from './usePortalDetector.hook'

// Futuros hooks reutilizáveis:
// export { useAuthSession } from './useAuthSession.hook'
// export { useDebounce } from './useDebounce.hook'
// export { useClickOutside } from './useClickOutside.hook'
// export { useLocalStorage } from './useLocalStorage.hook'
// export { useToast } from './useToast.hook'
