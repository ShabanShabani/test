//
//  BestPlaces.swift
//  MapsDirection
//
//  Created by Shahs Hdurb on 3/23/19.
//  Copyright © 2019 balitax. All rights reserved.
//

import UIKit
import Alamofire


class BestPlaces: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    //var objNetwor: NetworkController = NetworkController()
    var objStoryRoot = [storyRoute]()
    var StorybuttonX = 15
    let currentDeviceidentifier = UIDevice.current.identifierForVendor!.uuidString
    @IBOutlet weak var scrollView: UIScrollView!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        view.addSubview(scrollView)
        
        getStory()
        
    }
    
    @IBAction func btnNavigation(_ sender: Any) {
        performSegue(withIdentifier: "showNavigation_segue", sender: nil)
    }
    
    
    @IBAction func takePhoto(_ sender: UIButton) {
        
        performSegue(withIdentifier: "showCamera_segue", sender: nil)
    }
    
    
    func getStory()
    {
        let url = "http://10.0.0.29:8088/api/story/get"
        Alamofire.request(url, method: .get, parameters: nil, encoding: JSONEncoding.default, headers: nil).responseJSON { response in
            do {
                self.objStoryRoot = try JSONDecoder().decode(Array<storyRoute>.self, from: response.data!)
                self.getImg()
            }
            catch let error {
                print("Nuk funksionon \(error)")
            }
        }
    }
    func getImg()
    {
        for devices in self.objStoryRoot
        {
            
            let btnStory = UIButton(frame: CGRect(x:0, y:0, width:65, height:65))
            btnStory.frame.origin = CGPoint(x: StorybuttonX, y: 0)
            
            for buttonImg in devices.storyContent
            {
                var img = Data(base64Encoded: buttonImg, options: Data.Base64DecodingOptions.ignoreUnknownCharacters)
                btnStory.setBackgroundImage(UIImage(data: img!), for: .normal)
            }
            btnStory.layer.cornerRadius = 32
            btnStory.layer.borderWidth = 1
            btnStory.layer.borderColor = UIColor.gray.cgColor
            btnStory.clipsToBounds = true
            btnStory.addTarget(self, action: #selector(self.buttonActionStory(_:)), for: UIControlEvents.touchUpInside)
            btnStory.accessibilityHint = devices.device
            StorybuttonX = StorybuttonX + 80
            self.scrollView.addSubview(btnStory)
        }
        scrollView.contentSize.height = 80
        scrollView.contentSize.width = CGFloat(StorybuttonX + 15)
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.alwaysBounceHorizontal = false
    }
    @objc func buttonActionStory(_ sender:UIButton)
    {
        let deviceId = sender.accessibilityHint
        //print("deviceId:\(deviceId)")
        self.performSegue(withIdentifier: "showStorySegue", sender: deviceId)
        
    }
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showStorySegue" {
           if let storyslider = segue.destination as? storySlider {
                storyslider.DeviceIdOfStory = sender as! String
            }
        }
    }
    
    
    
    
    
    
    
}

