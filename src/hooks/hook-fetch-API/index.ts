// Camada BFF - Hooks para chamadas à camada BFF e APIs externas
// Todos os hooks de fetch centralizam token, error handling, loading, normalização

export { useProtocolsData } from './useProtocolsData.hook'
export { useSliderBannerData } from './useSliderBannerData.hook'
export { useNewsHighlightData } from './useNewsHighlightData.hook'
export { useCronogramaData } from './useCronogramaData.hook'

// Futuros hooks de fetch (a implementar):
// export { useApi } from './useApi.hook'
// export { useGuias } from './useGuias.hook'
// export { useBoletos } from './useBoletos.hook'
// export { useAgendamentos } from './useAgendamentos.hook'
// export { usePacientes } from './usePacientes.hook'
