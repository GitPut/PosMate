use std::fs;

fn main() {
    let commands = b"Hello, printer!\n";
    let path = "COM3";

    // Check if the printer is available
    match fs::metadata(path) {
        Ok(_) => {
            // Open a connection to the printer
            let mut printer = File::create(path).expect("Failed to open serial port");

            // Write the raw commands to the printer
            printer.write_all(commands).expect("Failed to send commands to printer");
        }
        Err(e) => {
            println!("Printer not available: {}", e);
        }
    }
}