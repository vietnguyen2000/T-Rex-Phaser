export default class LoadingScreen {
  constructor (scene) {
    this.scene = scene
    this.progressBar = this.scene.add.graphics()
    this.progressBox = this.scene.add.graphics()
    this.progressBox.fillStyle(0x222222, 0.8)
    this.progressBox.fillRect(145, 55, 310, 40)
    const width = this.scene.cameras.main.width
    const height = this.scene.cameras.main.height
    this.loadingText = this.scene.make.text({
      x: width / 2,
      y: height / 2 + 40,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#000000'
      }
    })
    this.loadingText.setOrigin(0.5, 0.5)

    this.percentText = this.scene.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    this.percentText.setOrigin(0.5, 0.5)
  }

  progress () {
    return (value) => {
      this.progressBar.clear()
      this.progressBar.fillStyle(0x000000, 1)
      this.progressBar.fillRect(150, 60, 300 * value, 30)
      this.percentText.setText(parseInt(value * 100) + '%')
    }
  }

  complete () {
    return () => {
      this.progressBar.destroy()
      this.progressBox.destroy()
      this.loadingText.destroy()
      this.percentText.destroy()
    }
  }
}
