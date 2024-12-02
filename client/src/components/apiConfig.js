export const BASE_URLS = {
  ASSETS: 'https://asset-management-isa.onrender.com/assets',
  THREATS: '/api/threats',
  VULNERABILITIES: '/api/vulnerabilities',
  INCIDENTS: '/api/incidents',
  CRISIS_EVENTS: '/api/crisis_events',
};

export const API_PATHS = {
  // Assets
  ASSETS_LIST: `${BASE_URLS.ASSETS}`,                  // GET /api/assets
  ASSET_DETAIL: (id) => `${BASE_URLS.ASSETS}/${id}`,   // GET /api/assets/<id>
  ADD_ASSET: `${BASE_URLS.ASSETS}`,                    // POST /api/assets

  // Threats
  THREATS_LIST: `${BASE_URLS.THREATS}`,                // GET /api/threats
  THREAT_DETAIL: (id) => `${BASE_URLS.THREATS}/${id}`, // GET /api/threats/<id>

  // Vulnerabilities
  VULNERABILITIES_LIST: `${BASE_URLS.VULNERABILITIES}`, // GET /api/vulnerabilities
  VULNERABILITY_DETAIL: (id) => `${BASE_URLS.VULNERABILITIES}/${id}`, // GET /api/vulnerabilities/<id>
  ADD_VULNERABILITY: `${BASE_URLS.VULNERABILITIES}`, // POST /api/vulnerabilities

  // Incident Response
  INCIDENTS_LIST: `${BASE_URLS.INCIDENTS}`,             // GET /api/incidents
  REPORT_INCIDENT: `${BASE_URLS.INCIDENTS}`,            // POST /api/incidents
  RESOLVE_INCIDENT: (id) => `${BASE_URLS.INCIDENTS}/${id}/resolve`, // POST /api/incidents/<id>/resolve

  // Crisis
  CRISIS_LIST: `${BASE_URLS.CRISIS_EVENTS}`,            // GET /api/crisis_events
  LOG_CRISIS: `${BASE_URLS.CRISIS_EVENTS}`,             // POST /api/crisis_events
  RESOLVE_CRISIS: (id) => `${BASE_URLS.CRISIS_EVENTS}/${id}/resolve`, // POST /api/crisis_events/<id>/resolve
};
