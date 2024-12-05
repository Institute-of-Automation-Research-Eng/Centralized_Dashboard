export const BASE_URLS = {
  ASSETS: 'https://asset-management-isa.onrender.com/assets',
  PREDICT_ASSETS: 'https://asset-management-isa.onrender.com/predict',
  THREATS: '/api/threats',
  VULNERABILITIES: '/api/vulnerabilities',
  INCIDENTS: '/api/incidents',
  CRISIS_EVENTS: 'http://18.216.202.95:5000',
};

export const API_PATHS = {
  // Assets
  ASSETS_LIST: `${BASE_URLS.ASSETS}`,                  // GET /api/assets
  ASSET_DETAIL: (id) => `${BASE_URLS.ASSETS}/${id}`,   // GET /api/assets/<id>
  ADD_ASSET: `${BASE_URLS.ASSETS}`,                    // POST /api/assets
  PREDICT_ASSET: (id) => `${BASE_URLS.PREDICT_ASSETS}/${id}`,                // POST /api/predict/id
  RISK_HISTORY:  (id) => `${BASE_URLS.ASSETS}/${id}/risk_history`,

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
  CRISIS_LIST: `${BASE_URLS.CRISIS_EVENTS}/crisis-events`,            // GET /api/crisis_events
  CRISIS_DETAIL: (id) => `${BASE_URLS.CRISIS_EVENTS}/crisis-events/${id}`,   // GET /api/crisis_events/<id>
  LOG_CRISIS: (id) => `${BASE_URLS.CRISIS_EVENTS}/${id}/logs`,             // POST /api/crisis_events
  GENERATE_CRISIS_REPORT: (event_name) => `${BASE_URLS.CRISIS_EVENTS}/generate-report/${event_name}`,
  CRISIS_COMMUNICATION: (event_name) => `${BASE_URLS.CRISIS_EVENTS}/communication/${event_name}`,
  RESOLVE_CRISIS: (id) => `${BASE_URLS.CRISIS_EVENTS}/resolve/${id}`
};
