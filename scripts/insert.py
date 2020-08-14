#!/usr/bin/python

import firebase_admin
import datetime
import os
import csv
from dotenv import load_dotenv
from firebase_admin import credentials
from firebase_admin import firestore

load_dotenv(dotenv_path='../.env')
cred_file = os.getenv('gcloud_credentials_prod')

cname = os.getenv('COLLECTION_NAME_KIT')
filename = os.getenv('CSV_FILE_NAME')


# Service account for firestore
cred = credentials.Certificate('../' + cred_file)
firebase_admin.initialize_app(cred)

# Firestore model Specific
db = firestore.client()

batch = db.batch()

# Add docs to firestore
with open(filename, newline='') as csvfile:
    csvR = csv.reader(csvfile)
    csvR.__next__()
    for row in csvR:
        collection_ref = db.collection(cname).document()
        doc = {
            u'kit_id': row[1],
            u'project': u'catch',
            u'created': datetime.datetime.now()
        }
        batch.set(collection_ref, doc)

batch.commit()
