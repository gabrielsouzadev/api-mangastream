#!/bin/bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ../nginx/certificate.pem
