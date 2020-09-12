export const params = {
  capabilities: {},
  initializationOptions: {
    config: {
      applets: {
        validation: {
          template: true,
          style: false,
          script: false
        },
        experimental: {
          templateInterpolationService: true
        }
      }
    }
  }
};
