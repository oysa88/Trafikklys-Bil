radio.onReceivedNumber(function (receivedNumber) {
    RadioTallMottatt = receivedNumber
})
input.onButtonPressed(Button.A, function () {
    Program = 1
    basic.showString("A")
    basic.pause(500)
    basic.clearScreen()
    bitbot.setLedColor(0xFF0000)
})
input.onButtonPressed(Button.B, function () {
    Program = 2
    basic.showString("B")
    basic.pause(500)
    basic.clearScreen()
    bitbot.setLedColor(0x0000FF)
})
function BitBit_bil () {
    if (Kjør) {
        if (bitbot.readLine(BBLineSensor.Left) == 1) {
            bitbot.rotate(BBRobotDirection.Left, 15)
        } else if (bitbot.readLine(BBLineSensor.Right) == 1) {
            bitbot.rotate(BBRobotDirection.Right, 15)
        } else {
            bitbot.go(BBDirection.Forward, 25)
        }
    } else {
        bitbot.go(BBDirection.Forward, 0)
    }
    if (Program == 1 && input.runningTime() > grønnStart + kjøretidProgA) {
        bitbot.go(BBDirection.Forward, 0)
    }
}
function Program_bil () {
    if (Program == 1) {
        if (RadioTallMottatt == 1 && radio.receivedPacket(RadioPacketProperty.SignalStrength) > -44.2) {
            Kjør = true
            grønnStart = input.runningTime()
        }
    } else if (Program == 2) {
        if (RadioTallMottatt == 0 && radio.receivedPacket(RadioPacketProperty.SignalStrength) > -44.2) {
            Kjør = false
        } else {
            Kjør = true
        }
    }
}
let grønnStart = 0
let RadioTallMottatt = 0
let kjøretidProgA = 0
let Program = 0
let Kjør = false
radio.setGroup(1)
Kjør = false
Program = 0
kjøretidProgA = 5000
RadioTallMottatt = 0
basic.forever(function () {
    Program_bil()
    BitBit_bil()
})
