import socket
import uvicorn

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        s.listen(1)
        port = s.getsockname()[1]
    return port

if __name__ == "__main__":
    port = find_free_port()
    print(f"Starting server on port {port}")
    print(f"Update your frontend to use: http://localhost:{port}/predict")
    uvicorn.run("main:app", host="127.0.0.1", port=port)