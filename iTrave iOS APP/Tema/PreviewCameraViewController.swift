//
//  PreviewCameraViewController.swift
//  MapsDirection
//
//  Created by Shahs Hdurb on 4/30/19.
//  Copyright © 2019 balitax. All rights reserved.
//

import UIKit

class PreviewCameraViewController: UIViewController,UITextFieldDelegate, UIImagePickerControllerDelegate {
    
    weak var AlertViewController: UIViewController?

    var image: UIImage?
    @IBOutlet weak var photoView: UIImageView!
    @objc var newlocation = CurrentLocationChange()
    let currentDeviceidentifier = UIDevice.current.identifierForVendor!.uuidString
    let viewC = ViewController()
    var currentStar: Int!
    
    
    @IBOutlet weak var btn_Star1: UIButton!
    @IBOutlet weak var btn_Star2: UIButton!
    @IBOutlet weak var btn_Star3: UIButton!
    @IBOutlet weak var btn_Star4: UIButton!
    @IBOutlet weak var btn_Star5: UIButton!
    
    @IBOutlet weak var DescriptionView: UIView!
    @IBOutlet weak var txtDescription: UITextField!
    @IBOutlet weak var txtRate: UITextField!
    
    @IBOutlet weak var txtTimeofStory: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        photoView.image = self.image
        //viewC.initialize()
        self.txtDescription.delegate = self
        //self.txtRate.delegate = self
        //self.txtTimeofStory.delegate = self
        NotificationCenter.default.addObserver(self, selector: #selector(PreviewCameraViewController.keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(PreviewCameraViewController.keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
        
        
    }
    var YofDescriptionView: CGFloat!
    @objc func keyboardWillShow(notification: NSNotification) {
        if let keyboardSize = (notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
            if self.DescriptionView.frame.origin.y != 0 {
                YofDescriptionView = self.DescriptionView.frame.origin.y
                self.DescriptionView.frame.origin.y -= keyboardSize.height
            }
        }
    }
    
    @objc func keyboardWillHide(notification: NSNotification) {
        if self.DescriptionView.frame.origin.y != YofDescriptionView {
            self.DescriptionView.frame.origin.y = YofDescriptionView
        }
    }
    
    @IBAction func btnRetake(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    
    @IBAction func btnUpload(_ sender: Any) {
        let coordinate = viewC.locationManager.location!.coordinate
        let storyContent = UIImageJPEGRepresentation(image!, 0.1)!.base64EncodedString()
        
        
        
        let lng1: String = "\(coordinate.longitude)"
        let lat1: String = "\(coordinate.latitude)"
        
        
        let description = txtDescription.text
        let rate = String(currentStar)
        let timeofStory = "5"
        
        let device = currentDeviceidentifier
        let date = Date()
        let formatter = DateFormatter()
        formatter.dateFormat = "MM-dd-yyyy hh:mm:ss"
        let postdate = formatter.string(from: date)
        print(postdate)
        let newPost = ["lat": String(lat1), "lng": String(lng1), "postDate": postdate , "device": device, "storyContent":storyContent, "rateClient": rate, "timeStory": timeofStory, "storyDescription": description] as [String : Any]
        NetworkController().postStory(storyValue: newPost)
        dismiss(animated: true, completion: nil)
        
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        self.view.endEditing(true)
        return false
    }
    
    
    @IBAction func btnStar_1(_ sender: UIButton) {
        if sender.currentBackgroundImage == UIImage(named:"starCopy3")
        {
            
            sender.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            currentStar = 1
        }
        else
        {
            sender.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star2.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star3.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star4.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star5.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            currentStar = 0
            
            
        }
        
    }
    
    @IBAction func btnStar_2(_ sender: UIButton) {
        if sender.currentBackgroundImage == UIImage(named:"starCopy3")
        {
            sender.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star1.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            currentStar = 2
        }
        else
        {
            sender.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star1.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star3.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star4.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star5.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            currentStar = 0
            
        }
    }
    
    @IBAction func btn_Star3(_ sender: UIButton) {
        if sender.currentBackgroundImage == UIImage(named:"starCopy3")
        {
            sender.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star1.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star2.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            currentStar = 3
            
        }
        else
        {
            sender.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star1.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star2.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star4.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star5.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            currentStar = 0
        }
    }
    
    @IBAction func btn_Star4(_ sender: UIButton) {
        if sender.currentBackgroundImage == UIImage(named:"starCopy3")
        {
            sender.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star1.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star2.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star3.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            currentStar = 4
            
        }
        else
        {
            sender.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star1.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star2.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star3.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star5.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            currentStar = 0
        }
    }
    
    @IBAction func btn_Star5(_ sender: UIButton) {
        if sender.currentBackgroundImage == UIImage(named:"starCopy3")
        {
            sender.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star1.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star2.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star3.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            btn_Star4.setBackgroundImage(UIImage(named:"starCopy4"), for: .normal)
            currentStar = 5
            
        }
        else
        {
            sender.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star1.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star2.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star3.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            btn_Star4.setBackgroundImage(UIImage(named:"starCopy3"), for: .normal)
            currentStar = 0
        }
    }
    
    
    @IBAction func btnSavePhoto(_ sender: AnyObject) {
        DispatchQueue.main.async {
            UIImageWriteToSavedPhotosAlbum(self.image!, self, #selector(self.image(_:didFinishSavingWithError:contextInfo:)), nil)
        }
        
    }
    
    
    @objc func image(_ image: UIImage, didFinishSavingWithError error: Error?, contextInfo: UnsafeRawPointer) {
        if let error = error {
            // we got back an error!
            showAlertWith(title: "Save error", message: error.localizedDescription)
        } else {
            showAlertWith(title: "Saved!", message: "Your image has been saved to your photos.")
        }
    }
    
    func showAlertWith(title: String, message: String){
        let ac = UIAlertController(title: title, message: message, preferredStyle: .alert)
        ac.addAction(UIAlertAction(title: "OK", style: .default))
        DispatchQueue.main.async {
            self.present(ac, animated: true, completion: nil)

        }
       // self.present(ac, animated: true, completion: nil)
        //present(ac, animated: true)
    }
    
    
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
     // Get the new view controller using segue.destination.
     // Pass the selected object to the new view controller.
     }
     */
    
}
