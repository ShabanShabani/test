//
//  NetworkController.swift
//  Tema
//
//  Created by Shahs Hdurb on 5/15/19.
//  Copyright © 2019 Shahs Hdurb. All rights reserved.
//

import Foundation
//
//  NetworkController.swift
//  MapsDirection
//
//  Created by Shahs Hdurb on 4/15/19.
//  Copyright © 2019 balitax. All rights reserved.
//

import UIKit
import GoogleMaps
import GooglePlaces
import SwiftyJSON
import Alamofire
import Foundation
import CoreLocation



class NetworkController {
    //var objQuestion = Question()
    static let shared = NetworkController()
    //var objStoryRoot = [storyRoute]()
    var allimagesArray: [String] = []
    
    
    
    func postStory(storyValue : [String:Any])
    {
        let url = "http://10.0.0.29:8088/api/story/post"
        let url1 = "http://82.114.68.190:8088/api/story/post"
        
        Alamofire.request(url, method: .post, parameters: storyValue,encoding: JSONEncoding.default, headers: nil).responseString {
            response in
            switch response.result {
            case .success:
                print(response)
                
                
                break
            case .failure(let error):
                
                print(error)
            }
        }
    }
    
    
}
