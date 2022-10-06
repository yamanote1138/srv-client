"use strict";

import { connect as NetConnect, Socket, SocketReadyState } from "net";

class SrvClient {
  protected readonly _host: string;
  protected readonly _port: number = 1138;
  protected _socket?: Socket;

  constructor(host: string, port?: number) {
    this._host = host;
    if (port !== undefined) this._port = port;

    this._validate();
  }

  protected _validate = () => {
    if (!this._host) throw new Error("host is empty");
    if (this._port < 0 || this._port > 65535)
      throw new Error("port is out of range");
  };

  protected _send = async (cmd: string) => {
    // if(this._socket.readyState == SocketReadyState.open)
    return await this._socket?.write(cmd);
  };

  connect = async () => {
    // connect to srv1, return connected socket obj
    this._socket = NetConnect({ host: this._host, port: this._port });
  };

  setLaser = async (status: string) => {
    return await this._send(status == "on" ? "L" : "l");
  };

  go = async (direction: string) => {
    let cmd;

    switch (direction) {
      case "foreward":
      case "forward":
        cmd = "8";
        break;
      case "backward":
      case "back":
        cmd = "2";
        break;
      case "left":
        cmd = "0";
        break;
      case "right":
        cmd = ".";
        break;
      default:
        throw new Error(`unsupported direction: '${direction}'`);
    }
    return await this._send(cmd);
  };

  stop = async () => {
    return await this._send("5");
  };

  disconnect = async () => {
    return await this._socket?.end();
  };
}

export { SrvClient };
