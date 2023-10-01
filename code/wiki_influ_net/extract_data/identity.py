#!/usr/bin/env python
# coding: utf-8

# In[17]:


import function


# In[16]:


import nltk
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize


# In[3]:


# "C:\Users\zhenj\Box\Portfolio\Projects\Project Vox\Data\philosopher_influence\extract_data\info_lists\philo_info_list.json"
with open('info_lists/philo_info_list.json', 'r') as f:
  ent_info_list = json.load(f)


# In[5]:


for ent in ent_info_list:
    print(ent["dbpedia_info"]["abstract"])


# In[21]:


potential_list = []

for item in ent_info_list:
        abstract = item["dbpedia_info"]["abstract"]
        name = item['entity']
        # let's assume that the sexual pronouns appear in the first three sentences
        # corner cases: sometimes the abstract is less than 3 sentences and reveal nothing about gender
        bio_list = nltk.tokenize.sent_tokenize(abstract)
        # if len(bio_list) <= 3:
        #         print(bio)
        bio = " | ".join(bio_list[0:3])

        if "was" in bio or "is" in bio:
            continue
        elif not bio:
            print(name, bio)
        # else:
            
        # if not any(x in bio for x in pronouns):
        #         print(bio)
        # if any(x in bio for x in women_pronouns):
        #         if any(x in bio for x in men_pronouns):
        #                 print(name)
        #                 print(bio)
        #         else:
        #                 potential_list.append(item)


#  - [ ] fix disambiguation (missing abstract)

# In[32]:


iden_words = [" was a ", " was an ", " is a ", " is an "]

for item in ent_info_list:
        abstract = item["dbpedia_info"]["abstract"]
        name = item['entity']
        # let's assume that the sexual pronouns appear in the first three sentences
        # corner cases: sometimes the abstract is less than 3 sentences and reveal nothing about gender
        bio_list = nltk.tokenize.sent_tokenize(abstract)
        # print(bio_list[:4])
        for s in bio_list[:4]:
            if any(x in s for x in iden_words):
                print(s)
            else:
                continue
                # print("========")
                # print(bio)


# In[ ]:




