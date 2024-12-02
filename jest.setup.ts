/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';

// Mock of ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;


// Mock of TransformStream
if (typeof global.TransformStream === 'undefined') {
    global.TransformStream = class TransformStream<I = any, O = any> {
      readable: ReadableStream<O>;
      writable: WritableStream<I>;
  
      constructor() {
        this.readable = new ReadableStream<O>();
        this.writable = new WritableStream<I>();
      }
    };

  }