radio.onReceivedNumber(function (receivedNumber) {
    if (Program == 1) {
        if (receivedNumber == 1 && radio.receivedPacket(RadioPacketProperty.SignalStrength) > -44.2) {
            Kjør = true
            grønnStart = input.runningTime()
        }
    } else if (Program == 2) {
        if (receivedNumber == 0 && radio.receivedPacket(RadioPacketProperty.SignalStrength) > -44.2) {
            Kjør = false
        } else {
            Kjør = true
        }
    }
})
input.onButtonPressed(Button.A, function () {
    Program = 1
    basic.showString("A")
    basic.pause(500)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    Program = 2
    basic.showString("B")
    basic.pause(500)
    basic.clearScreen()
})
let grønnStart = 0
let Program = 0
let Kjør = false
radio.setGroup(1)
Kjør = false
Program = 0
let kjøretidProgA = 5000
basic.forever(function () {
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
})
