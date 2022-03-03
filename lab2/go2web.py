import socket
import argparse
from bs4 import BeautifulSoup

PORT = 8000

parser = argparse.ArgumentParser(description='Command-line Browser')
group = parser.add_mutually_exclusive_group()

group.add_argument('-u', '--URL', action='store', help='Search by URL')
group.add_argument('-s', '--TERM', action='store', help='Search by a term')


def HTTP_Request(command_type, uri, port):
    HTTP_command = f'{command_type} {uri} HTTP/1.1\n\n'
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect((socket.gethostbyname(uri), port))
    HTTP_command = HTTP_command.encode('utf-8')
    client.send(HTTP_command)
    response = client.recv(4096)
    soup = BeautifulSoup(response, 'html.parser')
    print(soup.get_text())


if __name__ == '__main__':
    args = parser.parse_args()
    if args.URL:
        HTTP_Request("GET", args.URL, 80)
        
    elif args.TERM:
        print('Keyword: ', args.TERM)

