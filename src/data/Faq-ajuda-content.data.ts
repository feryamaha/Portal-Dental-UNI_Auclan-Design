import type { FaqAjudaContent } from '@/types/shared/faq-ajuda.types'

export const faqAjudaContentMock: Record<string, FaqAjudaContent> = {
    dentista: {
        portal: 'dentista',
        categories: [
            {
                id: 'all',
                label: 'Tudo',
                value: 'all',
                items: [
                    {
                        id: 'dentista-1',
                        question: 'Como faço para encontrar um dentista na rede credenciada?',
                        answer: 'Você pode acessar nossa central de ajuda ou utilizar o buscador de dentistas no portal. Filtre por localização, especialidade e disponibilidade de horários.'
                    },
                    {
                        id: 'dentista-1b',
                        question: 'Consigo favoritar dentistas ou clínicas para acessar depois?',
                        answer: 'Sim. No buscador, clique em "Favoritar" no cartão do profissional. Suas referências ficam salvas em "Favoritos" no topo do painel.'
                    },
                    {
                        id: 'dentista-2',
                        question: 'Quais procedimentos são cobertos pelo plano Dental Uni?',
                        answer: 'O plano Dental Uni cobre procedimentos de limpeza, restauração, endodontia e cirurgias. Consulte a tabela de cobertura completa em nossa central.'
                    },
                    {
                        id: 'dentista-3',
                        question: 'Quais são as principais áreas de cobertura dos nossos planos odontológicos?',
                        answer: 'Cobrimos: Odontologia Geral, Endodontia, Periodontia, Ortodontia, Implantodontia e Cirurgias Bucais. Algumas especialidades podem ter limitações conforme o plano.'
                    },
                    {
                        id: 'dentista-3b',
                        question: 'Onde encontro a lista detalhada de materiais e códigos TUSS?',
                        answer: 'Acesse a seção "Documentos" > "Materiais e TUSS" para baixar o PDF atualizado com os códigos e descrições dos procedimentos.'
                    },
                    {
                        id: 'dentista-4',
                        question: 'Posso adicionar dependentes ao meu plano Dental Uni?',
                        answer: 'Sim, você pode adicionar dependentes (cônjuge e filhos) ao seu plano. Acesse a seção de dados cadastrais para solicitar a inclusão.'
                    },
                    {
                        id: 'dentista-5',
                        question: 'O que devo fazer se tiver problemas com a fatura ou pagamentos do meu plano Dental Uni?',
                        answer: 'Entre em contato com nosso suporte através do chat ou telefone. Você também pode consultar seus boletos na seção "Meus Boletos" do portal.'
                    },
                    {
                        id: 'dentista-6',
                        question: 'Como confirmar se um procedimento exige autorização prévia?',
                        answer: 'Na tela do procedimento, consulte a coluna "Autorização". Se marcado como obrigatório, abra um protocolo em "Meus Protocolos" antes de agendar.'
                    },
                    {
                        id: 'dentista-7',
                        question: 'Posso enviar radiografias ou exames pelo portal?',
                        answer: 'Sim. Em "Meus Protocolos", anexe arquivos em PDF ou imagem. O limite é 10 MB por arquivo.'
                    },
                    {
                        id: 'dentista-8',
                        question: 'Como acompanhar o status de um protocolo aberto?',
                        answer: 'Acesse "Meus Protocolos" e verifique a coluna "Status". Você também recebe notificações no sino do topo quando houver atualização.'
                    }
                ]
            },
            {
                id: 'new',
                label: 'Sou novo aqui',
                value: 'new',
                items: [
                    {
                        id: 'dentista-new-1',
                        question: 'Como faço para me cadastrar no portal Dental Uni?',
                        answer: 'Acesse a tela de login e clique em "Criar conta". Preencha seus dados pessoais e siga as instruções de verificação de e-mail.'
                    },
                    {
                        id: 'dentista-new-2',
                        question: 'Qual é o primeiro passo após meu cadastro?',
                        answer: 'Após o cadastro, você receberá um e-mail de confirmação. Clique no link para ativar sua conta e acessar o portal completo.'
                    },
                    {
                        id: 'dentista-new-3',
                        question: 'Como faço para agendar minha primeira consulta?',
                        answer: 'Acesse a seção "Agendar Consulta", selecione um dentista credenciado próximo a você e escolha um horário disponível.'
                    }
                ]
            },
            {
                id: 'irpf',
                label: 'IRPF',
                value: 'irpf',
                items: [
                    {
                        id: 'dentista-irpf-1',
                        question: 'Posso deduzir despesas odontológicas no IRPF?',
                        answer: 'Sim, despesas com saúde, incluindo odontologia, podem ser deduzidas na declaração de IRPF. Solicite recibos de todos os procedimentos realizados.'
                    },
                    {
                        id: 'dentista-irpf-2',
                        question: 'Como obtenho comprovantes para declaração de IRPF?',
                        answer: 'Você pode baixar recibos e comprovantes de pagamento diretamente do portal na seção "Meus Protocolos" ou solicitando ao dentista.'
                    }
                ]
            },
            {
                id: 'classified',
                label: 'Classificados',
                value: 'classified',
                items: [
                    {
                        id: 'dentista-classified-1',
                        question: 'Como faço para publicar um anúncio de serviço odontológico?',
                        answer: 'Acesse a seção "Classificados" e clique em "Publicar Anúncio". Preencha os dados do serviço e aguarde a aprovação.'
                    }
                ]
            },
            {
                id: 'calendar',
                label: 'Calendário',
                value: 'calendar',
                items: [
                    {
                        id: 'dentista-calendar-1',
                        question: 'Como visualizo meus agendamentos no calendário?',
                        answer: 'Acesse a seção "Calendário" para ver todos os seus agendamentos. Você pode filtrar por data, dentista ou tipo de procedimento.'
                    },
                    {
                        id: 'dentista-calendar-2',
                        question: 'Posso remarcar uma consulta agendada?',
                        answer: 'Sim, você pode remarcar consultando o calendário, selecionando o agendamento e escolhendo uma nova data/hora disponível.'
                    }
                ]
            }
        ]
    },
    beneficiario: {
        portal: 'beneficiario',
        categories: [
            {
                id: 'all',
                label: 'Tudo',
                value: 'all',
                items: [
                    {
                        id: 'beneficiario-1',
                        question: 'Como faço para encontrar um dentista na rede credenciada?',
                        answer: 'Utilize o buscador de dentistas no portal. Filtre por localização, especialidade e horários disponíveis. Todos os dentistas listados são credenciados.'
                    },
                    {
                        id: 'beneficiario-1b',
                        question: 'Consigo marcar retorno com o mesmo dentista pela agenda?',
                        answer: 'Sim. Na página do agendamento concluído, clique em "Agendar novo horário" para o mesmo profissional e escolha uma data disponível.'
                    },
                    {
                        id: 'beneficiario-2',
                        question: 'Quais procedimentos são cobertos pelo plano Dental Uni?',
                        answer: 'O plano cobre limpeza, restauração, endodontia, extrações e cirurgias. Consulte a tabela de cobertura para detalhes completos.'
                    },
                    {
                        id: 'beneficiario-3',
                        question: 'Quais são as principais áreas de cobertura dos nossos planos odontológicos?',
                        answer: 'Cobrimos: Odontologia Geral, Endodontia, Periodontia, Ortodontia, Implantodontia e Cirurgias Bucais.'
                    },
                    {
                        id: 'beneficiario-3b',
                        question: 'Onde vejo histórico de pagamentos e 2ª via de boleto?',
                        answer: 'Entre em "Meus Boletos" para visualizar histórico, baixar 2ª via e consultar status de pagamento.'
                    },
                    {
                        id: 'beneficiario-4',
                        question: 'Posso adicionar dependentes ao meu plano Dental Uni?',
                        answer: 'Sim, você pode adicionar cônjuge e filhos. Acesse "Dados Cadastrais" para solicitar a inclusão de dependentes.'
                    },
                    {
                        id: 'beneficiario-5',
                        question: 'O que devo fazer se tiver problemas com a fatura ou pagamentos do meu plano Dental Uni?',
                        answer: 'Consulte a seção "Meus Boletos" para visualizar suas faturas. Para dúvidas, entre em contato com nosso suporte.'
                    },
                    {
                        id: 'beneficiario-6',
                        question: 'Como acompanho o status de um pedido de reembolso?',
                        answer: 'Em "Meus Protocolos", abra o protocolo de reembolso e veja a linha do tempo de status. Notificações também aparecem no sino do topo.'
                    },
                    {
                        id: 'beneficiario-7',
                        question: 'Preciso de guia ou autorização antes de alguns procedimentos?',
                        answer: 'Alguns procedimentos exigem guia. Verifique na listagem do procedimento ou consulte seu dentista credenciado antes do agendamento.'
                    },
                    {
                        id: 'beneficiario-8',
                        question: 'Consigo reagendar ou cancelar uma consulta pelo portal?',
                        answer: 'Sim. Vá em "Calendário", selecione o agendamento e escolha "Remarcar" ou "Cancelar". Alguns horários seguem regras de antecedência.'
                    }
                ]
            },
            {
                id: 'new',
                label: 'Sou novo aqui',
                value: 'new',
                items: [
                    {
                        id: 'beneficiario-new-1',
                        question: 'Como faço para me cadastrar no portal Dental Uni?',
                        answer: 'Clique em "Criar Conta" na tela de login. Preencha seus dados e confirme seu e-mail para ativar a conta.'
                    },
                    {
                        id: 'beneficiario-new-2',
                        question: 'Qual é o primeiro passo após meu cadastro?',
                        answer: 'Confirme seu e-mail através do link enviado. Após isso, você terá acesso completo ao portal.'
                    },
                    {
                        id: 'beneficiario-new-3',
                        question: 'Como faço para agendar minha primeira consulta?',
                        answer: 'Acesse "Agendar Consulta", escolha um dentista credenciado e selecione um horário disponível.'
                    }
                ]
            },
            {
                id: 'irpf',
                label: 'IRPF',
                value: 'irpf',
                items: [
                    {
                        id: 'beneficiario-irpf-1',
                        question: 'Posso deduzir despesas odontológicas no IRPF?',
                        answer: 'Sim, despesas com saúde, incluindo odontologia, são dedutíveis. Guarde todos os recibos para a declaração.'
                    },
                    {
                        id: 'beneficiario-irpf-2',
                        question: 'Como obtenho comprovantes para declaração de IRPF?',
                        answer: 'Baixe recibos diretamente do portal em "Meus Protocolos" ou solicite ao dentista.'
                    }
                ]
            },
            {
                id: 'classified',
                label: 'Classificados',
                value: 'classified',
                items: [
                    {
                        id: 'beneficiario-classified-1',
                        question: 'Como faço para publicar um anúncio?',
                        answer: 'Acesse "Classificados" e clique em "Publicar Anúncio". Preencha os dados e aguarde aprovação.'
                    }
                ]
            },
            {
                id: 'calendar',
                label: 'Calendário',
                value: 'calendar',
                items: [
                    {
                        id: 'beneficiario-calendar-1',
                        question: 'Como visualizo meus agendamentos?',
                        answer: 'Acesse "Calendário" para ver todos os seus agendamentos e procedimentos marcados.'
                    },
                    {
                        id: 'beneficiario-calendar-2',
                        question: 'Posso remarcar uma consulta?',
                        answer: 'Sim, acesse o calendário, selecione o agendamento e escolha uma nova data/hora.'
                    }
                ]
            }
        ]
    }
}
