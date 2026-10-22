from http.server import BaseHTTPRequestHandler

from admin_api import ConfigurationError, route, send_json


class handler(BaseHTTPRequestHandler):
    def dispatch(self):
        try:
            route(self)
        except ValueError as error:
            send_json(self, 400, {"error": str(error)})
        except ConfigurationError as error:
            send_json(self, 503, {"error": str(error)})
        except Exception as error:
            print("Admin API request failed:", type(error).__name__, flush=True)
            send_json(self, 503, {"error": "Serviço temporariamente indisponível."})

    def do_GET(self):
        self.dispatch()

    def do_POST(self):
        self.dispatch()

    def do_DELETE(self):
        self.dispatch()

    def do_OPTIONS(self):
        self.dispatch()

    def end_headers(self):
        from admin_api import allowed_origins

        origin = self.headers.get("Origin", "").rstrip("/")
        if origin in allowed_origins():
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Access-Control-Allow-Credentials", "true")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Vary", "Origin")
        super().end_headers()