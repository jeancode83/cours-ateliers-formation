console.log("Hello !");

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  })
}

var waypoint = new Waypoint({
	element: document.getElementById('jt-accordeon-triptik'),
	handler: function () {
		const toastLiveWaypoint = document.getElementById('liveToast')
        if (toastLiveWaypoint) {
            bootstrap.Toast.Default.delay = 10000
            const toast = new bootstrap.Toast(toastLiveWaypoint)
            toast.show()     
        } 
	}
})
