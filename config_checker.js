const si = require('systeminformation');

si.cpu()
    .then(data => {
        console.log('CPU Information:');
        console.log('- Model name: ' + data.manufacturer + ' ' + data.brand);
        si.baseboard()
            .then(data => {
                console.log('Motherboard Information:');
                console.log('- Model: ' + data.manufacturer + ' ' + data.model);
            })
            .catch(error => console.error(error))

        si.mem()
            .then(data => {
                console.log('RAM Information:');
                var ram = data.total.toString().charAt(0) ;
                console.log('- Total : ' + ram + ' Gb') ;
                console.log('> Disposition :')
                si.memLayout()
                    .then(data => {
                        data.forEach(ram => {
                            console.log('- ' + ram['manufacturer'] + ' ' +ram['size'].toString().charAt(0) + 'Gb');
                        });
                    })
            })
            .catch(error => console.error(error))

        si.battery()
            .then(data => {
                if (data.hasbattery != false){
                    console.log('Battery Information:');
                    console.log('- Max capacity' + data.maxcapacity) ;
                    console.log('- Model' + data.model) ;
                    console.log('- Manufacturer' + data.manufacturer) ;
                }
                else {
                    console.log('Battery Information:');
                    console.log('- No battery found');
                }
            })
            .catch(error => console.error(error))

        si.graphics()
            .then(data => {
                console.log('Graphics Information:');
                var gpus = data.controllers;
                gpus.forEach(gpu => {
                    console.log('- ' + gpu['model']);
                    console.log('> '+ gpu['vram'].toString()[0] + ' Gb');
                });
            })
            .catch(error => console.error(error))

        si.osInfo()
            .then(data => {
                console.log('System Information:');
                console.log('- Platform : ' + data.distro );
            })
            .catch(error => console.error(error))

        si.diskLayout()
            .then(data => {
                console.log('Disks Information:');
                data.forEach(disk => {
                    var disksize = disk.size / Math.pow(1024, 3)

                    console.log( '- ' + disk.name );
                    console.log('> Type: ' + disk.type );
                    console.log('> Size: ' + parseInt(disksize) + ' Gb' );
                });
            })
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))


console.log('Press any key to exit');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
