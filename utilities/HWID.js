const Registry   = require('winreg');
const {exec}     = require('child_process');
const {platform} = process;

const windowsHWID = () => new Promise((s, r) => {
    const key = new Registry({
        hive: Registry.HKLM,
        key: '\\SOFTWARE\\Microsoft\\Cryptography'
    });
    key.get('MachineGuid', (err, item) => {
        if (err) return r(err);
        else return s(item.value.toLowerCase());
    })
});

const unixHWID = () => new Promise((s, r) => {
    const command =
        platform === 'darwin' ?
        'ioreg -rd1 -c IOPlatformExpertDevice' :
        'cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null'

    exec(command, (err, stdout) => {
        if (err) return r(err)
        const parsed = parse(stdout)
        return s(parsed)
    })
});
const parse = (stdout = "") => {
        switch (platform) {
            case 'darwin':
                return stdout
                    .split('IOPlatformUUID')[1]
                    .split('\n')[0]
                    .replace(/\=|\s+|\"/gi, '')
                    .toLowerCase()

            case 'linux':
                return stdout
                    .toString()
                    .replace(/\r+|\n+|\s+/gi, '')
                    .toLowerCase()

            default:
                return ''
        }
}

function resolveHWID() {
    switch (platform) {
        case 'win32':
          return windowsHWID()
    
        case 'darwin':
        case 'linux':
          return unixHWID()
    
        default:
          return undefined
      }
}

module.exports = async(set) => {
    const hwid = await resolveHWID();
    if(hwid === undefined)throw new Error("Unsupported platform");
    if(hwid === '')throw new Error('Unknow parse');
    return hwid;
}