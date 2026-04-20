import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🚀 Giới thiệu',
    },
    {
      type: 'doc',
      id: 'GettingStarted',
      label: '📝 Tổng quan',
    },
    {
      type: 'category',
      label: '🔌 Services',
      items:
        [
          {
            type: 'doc',
            id: 'Services/AIMLService/Readme',
            label: 'AIMLService',

          },
          {
            type: 'doc',
            id: 'Services/AnalyticsService/Readme',
            label: 'AnalyticsService',
          },
          {
            type: 'doc',
            id: 'Services/FloodEyeService/Readme',
            label: 'FloodEyeService',
          },
          {
            type: 'doc',
            id: 'Services/IncidentService/Readme',
            label: 'IncidentService',
          },
          {
            type: 'doc',
            id: 'Services/IoTService/Readme',
            label: 'IoTService',
          },
          {
            type: 'doc',
            id: 'Services/MediaService/Readme',
            label: 'MediaService',
          },
          {
            type: 'doc',
            id: 'Services/NotificationService/Readme',
            label: 'NotificationService',
          },
          {
            type: 'doc',
            id: 'Services/SearchService/Readme',
            label: 'SearchService',
          },
          {
            type: 'doc',
            id: 'Services/WalletService/Readme',
            label: 'WalletService',
          },
        ]
    },
    {
      type: 'doc',
      id: 'Architecture',
      label: '🏗️ Kiến trúc hệ thống',
    },
    {
      type: 'doc',
      id: 'Installation',
      label: '🔧 Hướng dẫn cài đặt',
    },
    {
      type: 'doc',
      id: 'BUILD_WITHOUT_DOCKER',
      label: '🔧 Cài đặt không dùng Docker',
    },
    {
      type: 'doc',
      id: 'License',
      label: '📜 License',
    },
  ],
};

export default sidebars;
