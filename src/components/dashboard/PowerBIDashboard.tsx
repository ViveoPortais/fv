import React, { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { getDashboard } from '@/services/powerbi';
import { toast } from 'react-toastify';
import {PowerBIDashboardRequestModel} from '../../types/powerbi';


const PowerBIDashboard: React.FC<PowerBIDashboardRequestModel> = ({reportId, groupId}) => {
  const [embedConfig, setEmbedConfig] = useState({
    type: 'report',
    id: '',
    embedUrl: '',
    accessToken: '',
    tokenType: models.TokenType.Aad,
    settings: {
      panes: {
        filters: { expanded: false, visible: false },
        pageNavigation: { visible: false }
      }
    }
  });

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await getDashboard({reportId, groupId});

        if (!response.token || !response.embedUrl) {
          throw new Error('Falha ao obter token ou URL do Power BI');
        }
        setEmbedConfig(prevConfig => ({
          ...prevConfig,
          id: reportId!,
          embedUrl: response.embedUrl,
          accessToken: response.token
        }));
      } catch (error) {
        toast.error('Erro ao carregar relatório');
      }
    };

    if (reportId) {
      fetchAccessToken();
    }
  }, [reportId]);

  return (
      <PowerBIEmbed
        embedConfig={embedConfig}
        eventHandlers={new Map([
          ['loaded', () => console.log('Dashboard carregado')],
          ['rendered', () => console.log('Dashboard renderizado')],
          ['error', (event: any) => console.error('Erro no Power BI:', event.detail)]
        ])}
        cssClassName="powerbi-container"
        getEmbeddedComponent={(embeddedDashboard) => {
          (window as any).report = embeddedDashboard;
        }}
      />
  );
};

export default PowerBIDashboard;
