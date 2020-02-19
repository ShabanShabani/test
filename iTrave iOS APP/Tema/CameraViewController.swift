//
//  CameraViewController.swift
//  MapsDirection
//
//  Created by Shahs Hdurb on 4/30/19.
//  Copyright © 2019 balitax. All rights reserved.
//

import UIKit
import AVFoundation

enum CurrentFlashMode {
    case off
    case on
    case auto
}

class CameraViewController: UIViewController, UITextFieldDelegate {
    
    
    @IBOutlet weak var flashView: UIView!
    var captureSession = AVCaptureSession()
    var backCamera: AVCaptureDevice?
    var frontCamera: AVCaptureDevice?
    var currentCamera: AVCaptureDevice?
    var photoOutput: AVCapturePhotoOutput?
    var cameraPreviewLayer: AVCaptureVideoPreviewLayer?
    var image: UIImage?
    @IBOutlet weak var btnFlashOn: UIButton!
    @IBOutlet weak var btnFlashAuto: UIButton!
    @IBOutlet weak var btnflashOff: UIButton!
    let viewC = ViewController()
    
    
    //let PrevCam = PreviewCameraViewController()
    var timeofStory: String!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupCaptureSession()
        setupDevice()
        setupInputOutput()
        setupPriviewLayer()
        startRunningCaptureSession()
       
        //viewC.initialize()
        // Do any additional setup after loading the view.
    }
    
    
    
    @IBAction func btnCamera(_ sender: UIButton) {
        
    }
    
    func getSettings(camera: AVCaptureDevice, flashMode: CurrentFlashMode) -> AVCapturePhotoSettings {
        let settings = AVCapturePhotoSettings()
        
        if camera.hasFlash {
            switch flashMode {
            case .auto: settings.flashMode = .auto
            case .on: settings.flashMode = .on
            default: settings.flashMode = .off
            }
        }
        return settings
    }
    
    @IBAction func btnCapture(_ sender: UIButton) {
        //let settings = AVCapturePhotoSettings()
        //performSegue(withIdentifier: "showPhoto_segue", sender: nil)
        
        if btnflashOff.currentImage == UIImage(named:"onFlash")
        {
            let currentSettings = getSettings(camera: currentCamera!, flashMode: CurrentFlashMode.on)
            
            photoOutput?.capturePhoto(with: currentSettings, delegate: self)
            //currentCamera?.flashMode.on
        }
        else
        {
            if btnflashOff.currentImage == UIImage(named: "offFlash")
            {
                let currentSettings = getSettings(camera: currentCamera!, flashMode: CurrentFlashMode.off)
                
                photoOutput?.capturePhoto(with: currentSettings, delegate: self)
                
            }
            else
            {
                let currentSettings = getSettings(camera: currentCamera!, flashMode: CurrentFlashMode.auto)
                photoOutput?.capturePhoto(with: currentSettings, delegate: self)
            }
        }
        //PrevCam.timeOfStory = txtTimeOfStory.text
        
        
    }
    
    
    @IBAction func btnFlash(_ sender: UIButton) {
        setView(view: flashView, hidden: false)
    }
    
    @IBAction func btnFlashOn(_ sender: UIButton) {
        let senderImg = sender.image(for: .normal)
        
        let imgOff = btnflashOff.image(for: .normal)
        self.btnflashOff.setImage(senderImg, for: .normal
        )
        sender.setImage(imgOff, for: .normal)
        setView(view: flashView, hidden: true)
    }
    
    
    
    @IBAction func btnFlash1(_ sender: UIButton) {
        let senderImg = sender.image(for: .normal)
        let imgOff = btnflashOff.image(for: .normal)
        setView(view: flashView, hidden: true)
        btnflashOff.setImage(senderImg, for: .normal)
        sender.setImage(imgOff, for: .normal
        )
    }
    func setView(view: UIView, hidden: Bool) {
        UIView.transition(with: view, duration: 0.5,     options: .transitionFlipFromRight, animations: {
            view.isHidden = hidden
        })
    }
    func HideView(view: UIView, hidden: Bool) {
        UIView.transition(with: view, duration: 0.5,     options: .transitionFlipFromLeft, animations: {
            view.isHidden = hidden
        })
    }
    
    
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        self.view.endEditing(true)
        return false
    }
    
    
    @IBAction func btnClose(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    
    
    func setupCaptureSession()
    {
        //captureSession.sessionPreset = AVCaptureSession.Preset.
    }
    func setupDevice() {
        let deviceDiscoverySession = AVCaptureDevice.DiscoverySession(deviceTypes: [AVCaptureDevice.DeviceType.builtInWideAngleCamera], mediaType: AVMediaType.video, position: AVCaptureDevice.Position.unspecified)
        let devices = deviceDiscoverySession.devices
        for device in devices
        {
            if device.position == AVCaptureDevice.Position.back {
                backCamera = device
            }
            else if device.position == AVCaptureDevice.Position.front{
                frontCamera = device
            }
        }
        currentCamera = backCamera
    }
    func setupInputOutput()
    {
        do {
            let captureDeviceInput = try AVCaptureDeviceInput(device: currentCamera!)
            captureSession.addInput(captureDeviceInput)
            photoOutput = AVCapturePhotoOutput()
            
            if #available(iOS 11.0, *) {
                photoOutput?.setPreparedPhotoSettingsArray([AVCapturePhotoSettings(format: [AVVideoCodecKey: AVVideoCodecType.jpeg])], completionHandler: nil)
                captureSession.addOutput(photoOutput!)
            } else {
                // Fallback on earlier versions
            }
            
            
        } catch {
            print(error)
        }
        
    }
    func setupPriviewLayer()
    {
        cameraPreviewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        cameraPreviewLayer?.videoGravity = AVLayerVideoGravity.resizeAspectFill
        cameraPreviewLayer?.connection?.videoOrientation = AVCaptureVideoOrientation.portrait
        cameraPreviewLayer?.frame = self.view.frame
        self.view.layer.insertSublayer(cameraPreviewLayer!, at: 0)
    }
    func startRunningCaptureSession()
    {
        captureSession.startRunning()
        
    }
    
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
     // Get the new view controller using segue.destination.
     // Pass the selected object to the new view controller.
     }
     */
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showPhoto_segue" {
            let previewVC = segue.destination as! PreviewCameraViewController
            previewVC.image = self.image
        }
    }
    
}
@available(iOS 11.0, *)
extension CameraViewController: AVCapturePhotoCaptureDelegate{
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        if let imageData = photo.fileDataRepresentation() {
            image = UIImage(data: imageData)
            performSegue(withIdentifier: "showPhoto_segue", sender: nil)
        }
    }
}
