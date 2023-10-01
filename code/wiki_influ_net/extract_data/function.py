# ========== Packages ==========

import pandas as pd
import numpy as np
from bs4 import BeautifulSoup
import requests
import re
import pickle

import json
import sys
import networkx as nx
from networkx.readwrite import json_graph

import time
import datetime
from datetime import datetime

import copy

import nltk
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize

import plotly.express as px
import plotly.figure_factory as ff


# ========== Functions ==========



# ========== Get : Check ==========

def check_dupl_ent(ent_list):

    # check the duplicates
    # same names belong to different people

    wiki_philo_ent_dict = {}
    l = []
    for i in ent_list:
        if " (" not in i:
            print(i)
        # print(i.split(" (")[0])
        name =i.split(" (")[0]
        l.append(name)

    if len(l) == len( list(set(l))):
        print("no duplicates")
    else:
        print("list:",len(l))
        print("set:",len( list(set(l))) )

    dupl = set([x for x in l if l.count(x) > 1])
    for i in ent_list:
        if any(x in i for x in dupl):
            print(i)

# checked_list = handle_cornercase_1(ent_list)
# handle the corner cases
def handle_cornercase_1(ent_list):
    wiki_philo_checked_list = []
    for i in ent_list:
        if i == "Mao Zedong (1893–1976)":
            i = "Mao Zedong (or Mao Tse-tung) (1893–1976)[a]"
        elif i == "Vasily Rozanov (1856–1919)":
            i = "Vasily Rozanov (1856–1919)[4]"
        elif i == "Claude Henri de Rouvroy, Comte de Saint-Simon (1760–1825)":
            i = "Claude Henri de Rouvroy, Comte de Saint-Simon (1760–1825)[1][3][4]"

        elif "Philo of Larissa" in i:
            i = "Philo of Larissa (c. 159 B.C)"

        elif i == "Samuel Johnson (1649–1703)[d]":
            i = "Samuel Johnson_(pamphleteer) (1649–1703)"
        elif i == "Samuel Johnson (1696–1772)[b]":
            i = "Samuel Johnson_(American educator) (October 14, 1696 – January 6, 1772)"
        elif i == "Samuel Johnson (1709–1784)[b][c][d]":
            i = "Samuel Johnson (18 September 1709 – 13 December 1784)"
        
        if i in wiki_philo_checked_list:
            continue

        wiki_philo_checked_list.append(i)
        
    return wiki_philo_checked_list



def handle_corner_cases_2(ent_list):
    # for women philosophers listed
    # print those who have no birthdate record

    checked_ent_list = []
    for i in ent_list:
        # manually handel corner cases
        if i == "Lauren Barthold":
            i =  "Lauren Swayne Barthold (born 1965)"
        elif i == "Megan Craig":
            i = "Megan Craig (philosopher?)"
        elif i == "Divya Dwivedi":
            i = "Divya Dwivedi (Contemporary)"
        elif i == "Elisabeth Lloyd":
            i = "Elisabeth Lloyd (born September 3, 1956)"
        elif i == "Michele Moody-Adams":
            i = "Michele Moody-Adams (August 31, 1956)"
        elif i == "Karen Ng":
            i = "Karen Ng (philosopher?)"
        elif i == "Adrian Piper":
            i = "Adrian Piper (born September 20, 1948)"
        elif i == "Lisa Tessman":
            i = "Lisa Tessman (Contemporary)"
        elif i == "María Zambrano":
            i = "María Zambrano (22 April 1904)"
        
        checked_ent_list.append(i)

    # check
    for i in checked_ent_list:
        if "(" not in i:
            print("missing",i)

    return checked_ent_list




def get_wiki_philo_ent_1(ent_list):
    # get the last (), ignore []

    wiki_philo_ent_dict = {}
    for i in ent_list:
        info = {}
        sameAs, time = "",""

        name = i.split(" (")[0]
        
        #  remove []
        if i[-1] == ")":
            i = i[0:-1]
            # print(i[0:-1])
        else:
            if ")[" in i:
                idx = i.find(")[")
                # print(i[0:idx])
                i = i[0:idx]

            else:
                idx = i.find(") [")
                # print(i[0:idx])
                i = i[0:idx]

        # ()
        # (or another name)
        if "(or " in i:
            idx = i.find("(or ")
            # print(i[0:idx])
            # name = i[0:idx]
            s = i[idx+4:]
            # print(s)
            sep1 = s.find(")")
            sep2 = s.find("(")
            # print(s[0:sep1])
            sameAs = s[0:sep1].split(" or ")
            time = s[sep2+1:]
            # print(s[sep2+1:])
        else:
            # name = i.split(" (")[0]
            time = i.split(" (")[1]
        

        wiki_philo_ent_dict[name] = {"sameAs":sameAs, "time":time}
        
    return wiki_philo_ent_dict
    


def get_wiki_philo_ent_2(ent_list):
    # get the last (), ignore things after ()

    wiki_philo_ent_dict = {}

    for i in ent_list:
        info = {}
        extraInfo, time = "",""

        name = i.split("(")[0].strip()
        s = i.split("(")[1].strip()
        time = s.split(")")[0].strip()
        extraInfo = s.split(")")[1].strip()

        wiki_philo_ent_dict[name] = {"time":time, "extraInfo":extraInfo}
        
        # check
        if not name:
            print("missing:", i)

    return wiki_philo_ent_dict
    
# ================= Check Url ====================

def url_checker(url):
	try:
		get = requests.get(url) #Get Url
		if get.status_code == 200: # if the request succeeds 
			return True
		else:
			return False
	#Exception
	except requests.exceptions.RequestException as e:
        # print URL with Errs
		raise SystemExit(f"{url}: is Not reachable \nErr: {e}")

def check_wiki_url(ent_list):
    checked_list = []
    problem_list = []
    for ent in ent_list:
        ent = ent.replace(" ","_")
        url = "https://en.wikipedia.org/wiki/"+ent
        if url_checker(url):
            # print(url)
            checked_list.append(url)
        else:
            print("To check:", url)
            problem_list.append(url)

    return checked_list, problem_list

def check_db_url(ent_list):
    # checked_wikiUrl_list, problem_wikiUrl_list = check_wiki_url(full_wikiPhilo_list)

    # Check if the dbpage exist (it may exist but contain no information)
    # Also, be aware of the cases that multiple names refer to the same person

    checked_list = []
    problem_list = []

    for ent in ent_list:
        url = "https://dbpedia.org/page/"+ent
        url = url.replace(" ","_")
        
        # Check if the dbpage exist
        if url_checker(url): 
            # it may exist but contain no information

            checked_list.append(url)
        else:
            print("To check:", url)
            problem_list.append(url)

    return checked_list, problem_list




# ================== Get Data ======================


def get_db_philosopher(ent):
    label = ""
    sameAs = []
    influence, influencedBy, isInfluencedByOf, isInfluencesOf = [], [], [], []
    birthPlace, deathPlace = "",""
    wikiPageID = ""
    birthYear, deathYear = "",""
    abstract = ""
    info_dict = {}

    db_url = "https://dbpedia.org/page/"+ent.replace(" ","_")
    page = requests.get(db_url)
    info_df = pd.read_html(page.content)[0].values

    for i in info_df:
        text = re.sub('\s+', '', i[1])

        # Gottfried_Leibniz = Gottfried Wilhelm Leibniz
        if i[0] == "rdfs:label":
            label = i[1].replace(" (en)","")

        # Influence
        # dbo:influenced == dbp:influenced <-supplement- is dbp:influences of
        # dbo:influencedBy == dbp:influences <-supplement- is dbp:influenced of
        elif not influence and i[0] == "dbo:influenced":
            influence  = text.split("dbr:")[1:] # the first item is null
        elif not influencedBy and i[0] == "dbo:influencedBy":
            influencedBy = text.split("dbr:")[1:]
        elif not isInfluencesOf and i[0] == "is dbp:influenced  of":
            isInfluencesOf = text.split("dbr:")[1:]
        elif not isInfluencedByOf and i[0] == "is dbp:influences  of":
            isInfluencedByOf = text.split("dbr:")[1:]
        
        elif not wikiPageID and "wikiPageID" in i[0]:
            wikiPageID = i[1].split(" ")[0] # only keep the digits
        elif not birthYear and "birthYear" in i[0]:
            birthYear = i[1].split(" ")[0] # only keep the digits
        elif not deathYear and "deathYear" in i[0]:
            deathYear = i[1].split(" ")[0] # only keep the digits
        elif not abstract and "abstract" in i[0]:
            abstract = i[1]

        # there are multiple birth and death place items, only keep the first one
        elif not birthPlace and "birthPlace" in i[0]:
            birthPlace  = text.replace("dbr:",",")[1:]
        elif not deathPlace and "deathPlace" in i[0]:
            deathPlace  = text.replace("dbr:",",")[1:]

        # sameAs
        elif not sameAs and i[0] == "owl:sameAs":
            text = re.sub(' \t+', ';', i[1])
            sameAs = text.split(";")

    # create and return a dictionary

    # identifier
    info_dict["label"] = label
    info_dict["wikiPageID"] = wikiPageID

    # influence
    info_dict["db_influence_record"] = {
        "influences": influence,
        "influencedBy": influencedBy,
        "isInfluencesOf": isInfluencesOf,
        "isInfluencedByOf": isInfluencedByOf
    }
    
    # abstract
    info_dict["abstract"] = abstract

    # time
    info_dict["birthYear"] = birthYear
    info_dict["deathYear"] = deathYear

    # geographical
    info_dict["birthPlace"] = birthPlace
    info_dict["deathPlace"] = deathPlace
    # sameAs
    info_dict["sameAs"] = sameAs

    return info_dict
        


# ================== Merge Influence List ========================

def merge_db_influ_list(ent_info_list):
    info_list = copy.deepcopy(ent_info_list)

    for item in info_list:
        # scenario 1: influence others
        # dbo:influenced (influences) = dbp:influenced - is dbp:influences of (isInfluencedByOf)
        db_influ = item['dbpedia_info']['db_influence_record']
        if db_influ["influences"] != db_influ["isInfluencedByOf"]:
            # print(item["entity"]+"=============")
            print(db_influ["influences"],db_influ["isInfluencedByOf"])
            db_influ["influence_merged"] = list(set(db_influ["influences"] + db_influ["isInfluencedByOf"]))
            print(db_influ["influence_merged"])
        else:
            db_influ["influence_merged"] = list(set(db_influ["influences"]))

        # scenario 2: influenced by others
        # dbo:influencedBy (influencedBy) = dbp:influences - is dbp:influenced of (isInfluencesOf)
        if db_influ["influencedBy"] != db_influ["isInfluencesOf"]:
            # print(item["entity"]+"=============")
            print(db_influ["influencedBy"],db_influ["isInfluencesOf"])
            db_influ["influencedBy_merged"] = list(set(db_influ["influencedBy"] + db_influ["isInfluencesOf"]))
            print(db_influ["influencedBy_merged"])
        else:
            db_influ["influencedBy_merged"] = list(set(db_influ["influencedBy"]))
            

    return info_list


# ==================== Map the Influ and InfluBy lists ========================

def map_db_influ_list(ent_info_list):
    # influ_dict, influBy_dict = map_db_influ_list(ent_info_list)

    # Reverse / invert a dictionary mapping
    # note that "label", i.e., name, has no "_"

    # update the list by merging influence_dict, influencedBy_dict

    # inclusion: (1) include only the philosophers (2) exclude the philosophers with no dbpedia info
    info_list = copy.deepcopy(ent_info_list)
    influ_merged_dict, influBy_merged_dict = {}, {}
    for item in info_list:
        if item["entity"] == "":
            continue
        ent = item["entity"].replace(" ","_")
        influ_merged_dict[ent] = item['dbpedia_info']['db_influence_record']["influence_merged"]
        influBy_merged_dict[ent] = item['dbpedia_info']['db_influence_record']["influencedBy_merged"]
    # invert the dicts
    print("influence merged stats:")
    influ_merged_invr_dict = invert_dict(influ_merged_dict)
    print("influendBy merged stats:")
    influBy_merged_invr_dict = invert_dict(influBy_merged_dict)
    # merge the inverted dicts
    influ_dict = merge_dict(influ_merged_dict, influBy_merged_invr_dict)
    influBy_dict = merge_dict(influBy_merged_dict, influ_merged_invr_dict)

    # check: the new dicts shold conttain more values than the previous ones
    if len(influ_merged_dict) <= len(influ_dict) and len(influBy_merged_dict) <= len(influBy_dict):
        return influ_dict, influBy_dict
    else:
        print("Error: map_db_influ_list\n", len(influ_merged_dict), len(influBy_merged_dict),
            len(influ_dict), len(influBy_dict))
        return 

def invert_dict(d): # actually this is used to invert a dict of lists, NOT a simple list
    inverse = {} 
    for key in d: 
        # Go through the list that is saved in the dict:
        for item in d[key]:
            # Check if in the inverted dict the key exists
            if item not in list(inverse): 
                # If not create a new list
                inverse[item] = [key] # it is a list
            else: 
                inverse[item].append(key) 
    print("dict:",len(d),
        "| inverse dict:",len(inverse))
    return inverse

def merge_dict(d1, d2):
    # test: merge_dict(d1, d2)
    # d1 = {1:['a','b'], 2:['c','d']}
    # d2 = {1:['a'], 2:[], 3:['w','j']}
    new_dict = {}
    common_keys = list(set( list(d1)+ list(d2) ))
    for key in common_keys:
        l = []
        if key in list(d1):
            l = l + d1[key]
        if key in list(d2):
            l = l + d2[key]
        l = list (set(l))
        new_dict[key] = l
    # check
    if len(new_dict) != len( set ( list(d1.keys()) + list( d2.keys() ) )):
        return "ERROR: merge_dict"
    
    return new_dict



# ===================Add ID to Influ List ======================

def add_info_influ_dict(ent_info_list):
    # add the wikiPageID of entities in the influence list

    info_list = copy.deepcopy(ent_info_list)
    # build a dict with the wikiPageID of entities
    ent_id_dict = {}
    for item in info_list:
            ent_id_dict[item['entity'].replace(" ","_")] = item['dbpedia_info']['wikiPageID']

    # add the wikiPageID of entities in the influence list
    for item in info_list:
        influence_withid_list = []
        if item['inferred_info']['influence']:
            for influence in item['inferred_info']['influence']:
                influence_withid = {
                    'entity':influence.replace("_"," "),
                    'wikiPageID': ""
                }
                if influence in list(ent_id_dict):
                    influence_withid["wikiPageID"] = ent_id_dict[influence]

                influence_withid_list.append(influence_withid)
            # print(influence_withid_list)
            # check
            if len(item['inferred_info']['influence']) == len(influence_withid_list):
                item['inferred_info']['influence'] = influence_withid_list
            else:
                print("ERROR: add_info_influ_dict", item['entity'])
    
    print("Influence updated")

    for item in info_list:
        influencedBy_withid_list = []
        if item['inferred_info']['influencedBy']:
            for influencedBy in item['inferred_info']['influencedBy']:
                influencedBy_withid = {
                    'entity':influencedBy.replace("_"," "),
                    'wikiPageID': ""
                }
                if influencedBy in list(ent_id_dict):
                    influencedBy_withid["wikiPageID"] = ent_id_dict[influencedBy]
                influencedBy_withid_list.append(influencedBy_withid)
            
            # check
            if len(item['inferred_info']['influencedBy']) == len(influencedBy_withid_list):
                item['inferred_info']['influencedBy'] = influencedBy_withid_list
                
            else:
                print("ERROR: add_info_influ_dict", item['entity'])

    print("InfluencedBy updated")

    return info_list

# =================== Transform to Graph Data ======================
# ==================================================================


def transform(data, incl_label, list_label, score_label):
    filename = "graph_"+incl_label.replace(": ","")+"_"+list_label.replace("_","")+"_"+score_label.replace("_","")
    filename = filename.replace("__","_full_")

    data = prep_data(data, list_label, incl_label) # Transform into multiple datasets with different links
    node_map = build_node_map(data)
    graph = build_graph(data, node_map) # build graph
    # save graph
    pickle.dump( graph, open( "graph_data/graph_built/"+ filename +".p", "wb" ) )

    scores = node_metrics(graph, score_label) # calc scores
    graph_json = build_graph_json(data, node_map, scores, list_label)

    # store
    
    with open("graph_data/transformed_data/"+filename+".js", "w") as output_file:
        output_file.write('var graph = ')
        json.dump(graph_json, output_file, indent=4)
    
    print( "=> Done: graph_data/transformed_data/"+filename+".js")


def prep_data(data, list_label, incl_label):
    # "main: excluded; women: included", "" means everthing
    _data = []
    # ignore those do not have pages (id) or not included
    for item in data:
        if incl_label in item["inclusion"]:
            _data.append(item)
        else:
            continue
        
    for item in _data:
        item["asLink"] = item[list_label]
        item["asLink"] = [i for i in item["asLink"] if i["wikiPageID"] != ""]
    # print("1. Data selected")
    return _data


def build_node_map(data):
    node_map = {}
    for item in data:
        # some of them do not have wikiPageID, we need to exclude them because otherwise they will be merged together
        if item['wikiPageID']: # this step will remove empty nodes
            wikiPageID = item['wikiPageID']
            node_map[int(wikiPageID)] = item

    # check
    emp = [item for item in data if not item['wikiPageID']]
    if len(node_map) == len(data) - len(emp):
        # print("2. Node map built")
        return node_map
    else:
        return "ERROR! 2. Node map not built"
    

# build graph, where node id is wiki pageID
def build_graph(data, node_map):
    graph = nx.DiGraph()
    for item in data:
        if item['wikiPageID']:
            graph.add_node(int(item['wikiPageID']))

    for item in data:
        for ent in item['asLink']:
            if ent['wikiPageID'] and int(ent['wikiPageID']) in node_map:
                graph.add_edge(int(item['wikiPageID']), int(ent['wikiPageID']))
                
    # print("3. Graph built")
    return graph

def node_metrics(graph, score_label):
    # https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.link_analysis.pagerank_alg.pagerank.html?highlight=pagerank
    # https://networkx.org/documentation/stable/auto_examples/algorithms/plot_betweenness_centrality.html?highlight=centrality
    G = graph # directed
    G_ = G.to_undirected() # undirectd 

    if score_label == "pagerank":
        scores = nx.pagerank(G)
    elif score_label == "centr_betw":
        scores = nx.betweenness_centrality(G)
    elif score_label == "centr_clos":
        scores = nx.closeness_centrality(G)
    elif score_label == "centr_degr":
        scores = nx.degree_centrality(G)

    # graph metrics
    density = nx.density(G)
    print("Network density:", density)
    # print("4. Scores calculated")
    return scores


def build_graph_json(data, node_map, scores, list_label):
    # add score to node_map
    graph_json = {'nodes': [], 'links': []}
    for wikiPageID, score in scores.items():
        node_map[int(wikiPageID)]['score'] = score

    for item in data:
        # add nodes
        if  item['wikiPageID']:
            # need to transform the data type
            refer_list = item["referred_name"]
            refer_list_str =  " | ".join(refer_list)

            shown_list = [i["entity"] for i in item["asLink"]]
            shown_list_str = list_label + ": " + " | ".join(shown_list)

            incl_str =  str(item['inclusion'])

            graph_json_item = {
                "id": item['wikiPageID'], 
                "score": scores[int(item['wikiPageID'])], 
                "name": item['entity'], 
                "referred_name": refer_list_str,
                "inclusion": incl_str,
                "db_birthYear": item["db_birthYear"],
                "listed_birthYear": item["listed_birthYear"],

                "list_label": list_label,
                "asLink": shown_list_str, 
                "gender": item["gender_listed"]
                }
            graph_json['nodes'].append(graph_json_item)
        # add links
        for ent in item["asLink"]:
            if ent['wikiPageID'] and int(ent['wikiPageID']) in node_map:
                graph_json_edge = {'source': item['wikiPageID'], 'target': ent['wikiPageID'], 'value': 1}
                graph_json['links'].append(graph_json_edge)

    print("5. Graph json built")
    return graph_json



# =================== print statistics ======================

'''
should consider merge the two functions
'''


def print_inferlink_stats(info_list):
    COUNT_1, COUNT_2 = 0, 0 # count of influ and influBy links
    COUNT_ENT_INFLU, COUNT_ENT_INFLUBY = 0, 0 # count of entities with influ and influBy links
    influ_summary_list = []
    influBy_summary_list = []

    for item in info_list:

        COUNT_INFLU, COUNT_INFLUBY = 0, 0

        if item["entity"] == "":
            continue
        ent = item["entity"].replace(" ","_")

        if item["inferred_info"]["influence"]:
            COUNT_INFLU = len(item["inferred_info"]["influence"]) 
        else:
            COUNT_INFLU = 0
        # print(ent, item['dbpedia_info']['db_influence_record']["influence_merged"],COUNT_INFLU)
        influ_summary_list.append(COUNT_INFLU)
        if COUNT_INFLU > 0:
            COUNT_ENT_INFLU += 1

        if item["inferred_info"]["influencedBy"]:
            COUNT_INFLUBY = len(item["inferred_info"]["influencedBy"]) 
        else:
            COUNT_INFLUBY = 0
        # print(ent, COUNT_INFLUBY)
        influBy_summary_list.append(COUNT_INFLUBY)
        if COUNT_INFLUBY > 0:
            COUNT_ENT_INFLUBY += 1

        COUNT_1 += COUNT_INFLU
        COUNT_2 += COUNT_INFLUBY
    print("people who influenced others", COUNT_ENT_INFLU)
    print("people who were influenced by others", COUNT_ENT_INFLUBY)
    print("In total, influence links",COUNT_1, "| influencedBy links", COUNT_2)

    # print a histogram
    
    # print(influ_summary_dict, influBy_summary_dict)
    hist_data = [influ_summary_list, influBy_summary_list]
    df = pd.DataFrame(hist_data).T
    df.columns = ['influence', 'influencedBy']

    group_labels = ['influence links', 'influencedBy links']
    colors = ['#7FA6EE', '#B8F7D4']

    fig = ff.create_distplot(
        hist_data, group_labels, bin_size=2, show_curve=False,
        rug_text=group_labels, colors=colors)

    fig.update_layout(title_text='Influence/InfluencedBy links distribution')
    fig.update_layout(xaxis_range=[-2,260])
    fig.show()

    fig = ff.create_distplot(
        hist_data, group_labels, bin_size=2, show_curve=False,
        rug_text=group_labels, colors=colors)

    fig.update_layout(title_text='Influence/InfluencedBy links distribution (1 - 100)')
    fig.update_layout(xaxis_range=[-10,100])
    fig.show()


    # df = pd.DataFrame(influ_summary_dict.items(), columns=['ent', 'influence links'])
    # fig_influ = px.histogram(df, x="influence links") 
    # fig_influ.show()
    
    # df = pd.DataFrame(influBy_summary_dict.items(), columns=['ent', 'influencedBy links'])
    # fig_influBy = px.histogram(df, marginal="rug", x="influencedBy links")
    # fig_influBy.show()



def print_recordlink_stats(info_list):
    COUNT_1, COUNT_2 = 0, 0 # count of influ and influBy links
    COUNT_ENT_INFLU, COUNT_ENT_INFLUBY = 0, 0 # count of entities with influ and influBy links
    influ_summary_list = []
    influBy_summary_list = []

    for item in info_list:

        COUNT_INFLU, COUNT_INFLUBY = 0, 0

        if item["entity"] == "":
            continue
        ent = item["entity"].replace(" ","_")

        if item["dbpedia_info"]["db_influence_record"]["influence_merged"]:
            COUNT_INFLU = len(item["dbpedia_info"]["db_influence_record"]["influence_merged"]) 
        else:
            COUNT_INFLU = 0
        # print(ent, item['dbpedia_info']['db_influence_record']["influence_merged"],COUNT_INFLU)
        influ_summary_list.append(COUNT_INFLU)
        if COUNT_INFLU > 0:
            COUNT_ENT_INFLU += 1

        if item["dbpedia_info"]["db_influence_record"]["influencedBy_merged"]:
            COUNT_INFLUBY = len(item["dbpedia_info"]["db_influence_record"]["influencedBy_merged"]) 
        else:
            COUNT_INFLUBY = 0
        # print(ent, COUNT_INFLUBY)
        influBy_summary_list.append(COUNT_INFLUBY)
        if COUNT_INFLUBY > 0:
            COUNT_ENT_INFLUBY += 1

        COUNT_1 += COUNT_INFLU
        COUNT_2 += COUNT_INFLUBY
    print("people who influenced others", COUNT_ENT_INFLU)
    print("people who were influenced by others", COUNT_ENT_INFLUBY)
    print("In total, influence links",COUNT_1, "| influencedBy links", COUNT_2)

    # print(influ_summary_dict, influBy_summary_dict)
    hist_data = [influ_summary_list, influBy_summary_list]
    df = pd.DataFrame(hist_data).T
    df.columns = ['influence', 'influencedBy']

    group_labels = ['influence links', 'influencedBy links']
    colors = ['#7FA6EE', '#B8F7D4']

    fig = ff.create_distplot(
        hist_data, group_labels, bin_size=2, show_curve=False,
        rug_text=group_labels, colors=colors)

    fig.update_layout(title_text='Influence/InfluencedBy links distribution')
    fig.update_layout(xaxis_range=[-2,260])
    fig.show()

    fig = ff.create_distplot(
        hist_data, group_labels, bin_size=2, show_curve=False,
        rug_text=group_labels, colors=colors)

    fig.update_layout(title_text='Influence/InfluencedBy links distribution (1 - 100)')
    fig.update_layout(xaxis_range=[-10,100])
    fig.show()




# ======================================================
# ================== network analysis ==================

def build_save_graph(data, incl_label, list_label):
    '''
    just for build the graph (how the scores are calculated is not important)
    ''' 

    filename = "graph_"+incl_label.replace(": ","")+"_"+list_label.replace("_","")
    filename = filename.replace("__","_full_") # for the full list

    data = prep_data(data, list_label, incl_label) # Transform into multiple datasets with different links
    node_map = build_node_map(data)
    graph = build_graph(data, node_map) # build graph
    # save graph
    pickle.dump( graph, open( "graph_data/graph_built/" + filename +".p", "wb" ) )
    print("Graph saved:", "graph_data/graph_built/" + filename)

    return graph




