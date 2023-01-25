use serialport::prelude::*;

fn main() {
    let mut port = serialport::open("COM3").unwrap();
    port.write_all(b"\x1B\x40").unwrap();
    port.write_all(b"Hello, world!").unwrap();
}
