radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0 && radio.receivedPacket(RadioPacketProperty.SignalStrength) > -44.2) {
        Kjør = false
    } else {
        Kjør = true
    }
})
let Kjør = false
radio.setGroup(1)
Kjør = false
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
})
