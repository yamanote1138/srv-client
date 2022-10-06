jest.mock("net");

import { SrvClient } from '../../src/index'

describe('Constructor', () => {
  describe('when well-formed parameters are given', () => {
    it('should not throw an error', () => {
      expect(() => {new SrvClient('192.168.1.138');}).not.toThrowError();
      expect(() => {new SrvClient('192.168.1.138', 1138);}).not.toThrowError();
    });
  });
  describe('when the host is empty', () => {
    it('should throw an error', () => {
      expect(() => {new SrvClient('');}).toThrow('host is empty');
      expect(() => {new SrvClient('', 1138);}).toThrow('host is empty');
    });
  });
  describe('when port is out of range', () => {
    it('should throw an error', () => {
      expect(() => {new SrvClient('192.168.1.138', -1);}).toThrow('port is out of range');
      expect(() => {new SrvClient('192.168.1.138', 65536);}).toThrow('port is out of range');
    });
  });
});
