import type { NotificacoesPorMes } from '@/types/shared/notificacoes.types'

const notificacoesData: Record<string, NotificacoesPorMes[]> = {
    beneficiario: [
        {
            mes: 'Janeiro',
            ano: 2025,
            notificacoes: [
                {
                    id: '1',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Carlos Dante - Dental Uni respondeu o seu protocolo Token beneficiário - #...3180066279',
                    data: '12 de Jan, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '2',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Júlia Silva - Dental Uni respondeu o seu protocolo Atendimento ao beneficiário - #...3180066279',
                    data: '12 de Jan, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '3',
                    icon: 'iconArquivosUteis',
                    titulo: 'Manutenção programada',
                    descricao: 'Realizaremos manutenção preventiva no portal na próxima semana. Serviços podem ficar temporariamente indisponíveis.',
                    data: '15 de Jan, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '4',
                    icon: 'iconArquivosUteis',
                    titulo: 'Protocolo atualizado',
                    descricao: 'Seu protocolo #...992311 foi atualizado com novas observações. Confira os detalhes.',
                    data: '18 de Jan, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '5',
                    icon: 'iconArquivosUteis',
                    titulo: 'Cobrança confirmada',
                    descricao: 'O pagamento do boleto ref. janeiro/2025 foi confirmado. Obrigado!',
                    data: '20 de Jan, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '6',
                    icon: 'iconArquivosUteis',
                    titulo: 'Benefício disponível',
                    descricao: 'Novo benefício de atendimento emergencial disponível para sua região.',
                    data: '22 de Jan, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Fevereiro',
            ano: 2025,
            notificacoes: [
                {
                    id: '7',
                    icon: 'iconArquivosUteis',
                    titulo: 'Atualização cadastral',
                    descricao: 'Revise e confirme seus dados cadastrais para manter o acesso sem interrupções.',
                    data: '05 de Fev, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '8',
                    icon: 'iconArquivosUteis',
                    titulo: 'Documento disponível',
                    descricao: 'Seu comprovante de atendimento está disponível para download.',
                    data: '14 de Fev, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Março',
            ano: 2025,
            notificacoes: [
                {
                    id: '9',
                    icon: 'iconArquivosUteis',
                    titulo: 'Pesquisa de satisfação',
                    descricao: 'Conte para nós como foi sua experiência recente com o atendimento.',
                    data: '02 de Mar, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Junho',
            ano: 2025,
            notificacoes: [
                {
                    id: '10',
                    icon: 'iconArquivosUteis',
                    titulo: 'Campanha preventiva',
                    descricao: 'Participe da campanha de prevenção e faça seu check-up anual.',
                    data: '03 de Jun, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '11',
                    icon: 'iconArquivosUteis',
                    titulo: 'Consulta reagendada',
                    descricao: 'Sua consulta foi reagendada. Verifique a nova data no portal.',
                    data: '08 de Jun, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '12',
                    icon: 'iconArquivosUteis',
                    titulo: 'Comprovante disponível',
                    descricao: 'O comprovante do procedimento de junho já pode ser baixado.',
                    data: '12 de Jun, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '13',
                    icon: 'iconArquivosUteis',
                    titulo: 'Alerta de segurança',
                    descricao: 'Atualizamos nossas políticas de segurança. Confira as mudanças.',
                    data: '18 de Jun, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '14',
                    icon: 'iconArquivosUteis',
                    titulo: 'Atualização de rede',
                    descricao: 'Novos prestadores foram adicionados à rede credenciada da sua região.',
                    data: '25 de Jun, 2025',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Novembro',
            ano: 2024,
            notificacoes: [
                {
                    id: '15',
                    icon: 'iconArquivosUteis',
                    titulo: 'Novo arquivo disponível',
                    descricao: 'Está disponível para leitura o arquivo Protocolo de atendimento 2025. Leiam e fiquem por dentro das mudanças!',
                    data: '11 de Nov, 2024',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Dezembro',
            ano: 2024,
            notificacoes: [
                {
                    id: '16',
                    icon: 'iconArquivosUteis',
                    titulo: 'Anúncio expirado',
                    descricao: 'O anúncio Cadeira Odontológica Kavo expirou. Anuncie novamente ou remova-o dos classificados.',
                    data: '17 de Dez, 2024',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '17',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Está disponível para leitura o arquivo Protocolo de atendimento 2025. Leiam e fiquem por dentro das mudanças!',
                    data: '11 de Dez, 2024',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '18',
                    icon: 'iconArquivosUteis',
                    titulo: 'Fatura disponível',
                    descricao: 'Sua fatura de dezembro está disponível para pagamento.',
                    data: '05 de Dez, 2024',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '19',
                    icon: 'iconArquivosUteis',
                    titulo: 'Comprovante enviado',
                    descricao: 'Enviamos o comprovante do pagamento de dezembro para seu e-mail.',
                    data: '06 de Dez, 2024',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                },
                {
                    id: '20',
                    icon: 'iconArquivosUteis',
                    titulo: 'Lembrete de consulta',
                    descricao: 'Lembrete da consulta agendada para dezembro. Verifique horário e local.',
                    data: '09 de Dez, 2024',
                    link: '#',
                    portal: 'beneficiario',
                    lida: undefined
                }
            ]
        }
    ],
    dentista: [
        {
            mes: 'Janeiro',
            ano: 2025,
            notificacoes: [
                {
                    id: '1',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Carlos Dante - Dental Uni respondeu o seu protocolo Token beneficiário - #...3180066279',
                    data: '12 de Jan, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '2',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Júlia Silva - Dental Uni respondeu o seu protocolo Atendimento ao beneficiário - #...3180066279',
                    data: '12 de Jan, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '3',
                    icon: 'iconArquivosUteis',
                    titulo: 'Manutenção programada',
                    descricao: 'Realizaremos manutenção preventiva no portal na próxima semana. Serviços podem ficar temporariamente indisponíveis.',
                    data: '15 de Jan, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '4',
                    icon: 'iconArquivosUteis',
                    titulo: 'Protocolo atualizado',
                    descricao: 'Seu protocolo #...992311 foi atualizado com novas observações. Confira os detalhes.',
                    data: '18 de Jan, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '5',
                    icon: 'iconArquivosUteis',
                    titulo: 'Cobrança confirmada',
                    descricao: 'O pagamento do boleto ref. janeiro/2025 foi confirmado. Obrigado!',
                    data: '20 de Jan, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '6',
                    icon: 'iconArquivosUteis',
                    titulo: 'Benefício disponível',
                    descricao: 'Novo benefício de atendimento emergencial disponível para sua região.',
                    data: '22 de Jan, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Fevereiro',
            ano: 2025,
            notificacoes: [
                {
                    id: '7',
                    icon: 'iconArquivosUteis',
                    titulo: 'Atualização cadastral',
                    descricao: 'Revise e confirme seus dados cadastrais para manter o acesso sem interrupções.',
                    data: '05 de Fev, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '8',
                    icon: 'iconArquivosUteis',
                    titulo: 'Documento disponível',
                    descricao: 'Seu comprovante de atendimento está disponível para download.',
                    data: '14 de Fev, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Março',
            ano: 2025,
            notificacoes: [
                {
                    id: '9',
                    icon: 'iconArquivosUteis',
                    titulo: 'Pesquisa de satisfação',
                    descricao: 'Conte para nós como foi sua experiência recente com o atendimento.',
                    data: '02 de Mar, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Junho',
            ano: 2025,
            notificacoes: [
                {
                    id: '10',
                    icon: 'iconArquivosUteis',
                    titulo: 'Campanha preventiva',
                    descricao: 'Participe da campanha de prevenção e faça seu check-up anual.',
                    data: '03 de Jun, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '11',
                    icon: 'iconArquivosUteis',
                    titulo: 'Consulta reagendada',
                    descricao: 'Sua consulta foi reagendada. Verifique a nova data no portal.',
                    data: '08 de Jun, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '12',
                    icon: 'iconArquivosUteis',
                    titulo: 'Comprovante disponível',
                    descricao: 'O comprovante do procedimento de junho já pode ser baixado.',
                    data: '12 de Jun, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '13',
                    icon: 'iconArquivosUteis',
                    titulo: 'Alerta de segurança',
                    descricao: 'Atualizamos nossas políticas de segurança. Confira as mudanças.',
                    data: '18 de Jun, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '14',
                    icon: 'iconArquivosUteis',
                    titulo: 'Atualização de rede',
                    descricao: 'Novos prestadores foram adicionados à rede credenciada da sua região.',
                    data: '25 de Jun, 2025',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Novembro',
            ano: 2024,
            notificacoes: [
                {
                    id: '15',
                    icon: 'iconArquivosUteis',
                    titulo: 'Novo arquivo disponível',
                    descricao: 'Está disponível para leitura o arquivo Protocolo de atendimento 2025. Leiam e fiquem por dentro das mudanças!',
                    data: '11 de Nov, 2024',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                }
            ]
        },
        {
            mes: 'Dezembro',
            ano: 2024,
            notificacoes: [
                {
                    id: '16',
                    icon: 'iconArquivosUteis',
                    titulo: 'Anúncio expirado',
                    descricao: 'O anúncio Cadeira Odontológica Kavo expirou. Anuncie novamente ou remova-o dos classificados.',
                    data: '17 de Dez, 2024',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '17',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Está disponível para leitura o arquivo Protocolo de atendimento 2025. Leiam e fiquem por dentro das mudanças!',
                    data: '11 de Dez, 2024',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '18',
                    icon: 'iconArquivosUteis',
                    titulo: 'Fatura disponível',
                    descricao: 'Sua fatura de dezembro está disponível para pagamento.',
                    data: '05 de Dez, 2024',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '19',
                    icon: 'iconArquivosUteis',
                    titulo: 'Comprovante enviado',
                    descricao: 'Enviamos o comprovante do pagamento de dezembro para seu e-mail.',
                    data: '06 de Dez, 2024',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                },
                {
                    id: '20',
                    icon: 'iconArquivosUteis',
                    titulo: 'Lembrete de consulta',
                    descricao: 'Lembrete da consulta agendada para dezembro. Verifique horário e local.',
                    data: '09 de Dez, 2024',
                    link: '#',
                    portal: 'dentista',
                    lida: undefined
                }
            ]
        }
    ],
    comercial: [
        {
            mes: 'Janeiro',
            ano: 2025,
            notificacoes: [
                {
                    id: '1',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Carlos Dante - Dental Uni respondeu o seu protocolo Token beneficiário - #...3180066279',
                    data: '12 de Jan, 2025',
                    link: '#',
                    portal: 'comercial',
                    lida: undefined
                }
            ]
        }
    ],
    empresa: [
        {
            mes: 'Janeiro',
            ano: 2025,
            notificacoes: [
                {
                    id: '1',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Carlos Dante - Dental Uni respondeu o seu protocolo Token beneficiário - #...3180066279',
                    data: '12 de Jan, 2025',
                    link: '#',
                    portal: 'empresa',
                    lida: undefined
                }
            ]
        }
    ],
    representante: [
        {
            mes: 'Janeiro',
            ano: 2025,
            notificacoes: [
                {
                    id: '1',
                    icon: 'iconArquivosUteis',
                    titulo: 'Dental Uni respondeu o seu protocolo',
                    descricao: 'Carlos Dante - Dental Uni respondeu o seu protocolo Token beneficiário - #...3180066279',
                    data: '12 de Jan, 2025',
                    link: '#',
                    portal: 'representante',
                    lida: undefined
                }
            ]
        }
    ]
}

export function getNotificacoesByPortal(portal: string): NotificacoesPorMes[] {
    return notificacoesData[portal] || notificacoesData.beneficiario
}
