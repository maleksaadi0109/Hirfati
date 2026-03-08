const fs = require('fs');
const files = [
    'resources/js/layouts/DashboardLayout.tsx',
    'resources/js/pages/dashboard/components/DashboardComponents.tsx',
    'resources/js/components/ClientSidebar.tsx',
    'resources/js/pages/dashboard/WorkerDashboard.tsx',
    'resources/js/pages/dashboard/ClientDashboard.tsx',
    'resources/js/pages/Dashboard.tsx',
    'resources/js/pages/worker/Dashboard.tsx'
];

files.forEach(f => {
    try {
        if (!fs.existsSync(f)) return;
        let content = fs.readFileSync(f, 'utf8');
        // match dark:[A-Za-z0-9\-\/]+
        content = content.replace(/dark:[^\s"'\`\}]+/g, '');
        // remove multiple consecutive spaces left behind
        content = content.replace(/ +/g, ' ');
        fs.writeFileSync(f, content);
        console.log('Fixed ' + f);
    } catch (e) {
        console.error(e);
    }
});
