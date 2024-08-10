function updateProgress() {
    const now = new Date();
    const total = end - start;
    const elapsed = now - start;
    const progress = Math.min(Math.max(elapsed / total * 100, 0), 100);

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;

    const remaining = end - now;
    const timeInfo = remaining > 0
        ? `Time remaining: ${formatDuration(remaining)}`
        : 'Completed!';
    document.getElementById('time-info').textContent = timeInfo;
}

function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
}

setInterval(updateProgress, 1000);
updateProgress();