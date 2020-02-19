//
//  RoutePolyline.swift
//  Tema
//
//  Created by Shahs Hdurb on 5/13/19.
//  Copyright © 2019 Shahs Hdurb. All rights reserved.
//

import Foundation
struct RoutePolyline:Decodable {
    var points: String
    var latOfEndLocation: Float
    var lngOfEndLocation: Float
    var htmlInstructions: String
}
