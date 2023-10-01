//  for change
MATCH (person:Person), (location:Location), (connection:Connection), (label:Label)  DETACH DELETE location, person, connection, label
//  delete what do not have relationships
MATCH (n)
WHERE size((n)--())=0
DELETE (n)

//  browse
MATCH (person:Person), (location:Location), (connection:Connection)  RETURN location, person, connection


// export
MATCH (connection:Connection)
MATCH ()-[r:HAS_LABEL]->()
WITH collect(connection) as a, collect(r) as b
CALL apoc.export.json.data(a, b, "has_label.json", null)
YIELD file, source, format, nodes, relationships, properties, time, rows, batchSize, batches, done, data
RETURN file, source, format, nodes, relationships, properties, time, rows, batchSize, batches, done, data



// import data


//  [x] import each level of data separately


// Import nested json data
'''
{
"nets": [{
			"name": "Net 0",
			"path": [{
						"x": 0.949999988079071,
						"y": 0.009999999776482582,
						"z": 0.20000000298023224
					}, {
						"x": 0.949999988079071,
						"y": 0.009999999776482582,
						"z": 0.6000000238418579
					}
				],
			"pins": [[0, 2], [1, 1]]
		}, {


CALL apoc.load.json(filename) YIELD value AS v
WITH v.nets as nets // navigate
UNWIND nets as net // list
WITH net // for each net
MERGE (Net:NetNode {name: net.name})
FOREACH (xyz in net.path | MERGE (Net)-[:has_xyz]->(:XYZ {x: xyz.x, y: xyz.y, z:xyz.z}))
'''



'''
Duplicated because each connection is belong to a person (two people)
'''
//  create nodes of connections
CALL apoc.load.json("file:///people.json") YIELD value AS people
UNWIND people AS p
MERGE (person:Person {name: p.name, roles: p.roles})
FOREACH (roleName IN p.roles | MERGE (role:Role {name:roleName}) MERGE (person)-[:IS]->(role))

WITH p
UNWIND p.connections as c // get inividual connection
WITH c // for each connection
MERGE (connection:Connection {
                  // uri:c.uri,
                  type:c.type,
                  from:c.from,
                  to:c.to,
                  pv_source:c.source.projectvox_team,
                  date:c.date,
                  location:c.location,
                  relatesTo:c.relatesTo,
                  index_topic_shapiro: c.label.index_shapiro.topic,
                  index_person_shapiro: c.label.index_shapiro.person
                   })
FOREACH (index_topic_shapiro in c.label.index_shapiro.topic | MERGE (label:Label {name:index_topic_shapiro, type: "topic"})  MERGE (connection)-[:HAS_LABEL]->(label))
FOREACH (index_person_shapiro in c.label.index_shapiro.person | MERGE (label:Label {name:index_person_shapiro, type: "person"}) MERGE (connection)-[:HAS_LABEL]->(label))

FOREACH (personName IN c.from | MERGE (person:Person {name:personName}) MERGE (connection)<-[:WROTE]-(person))
FOREACH (personName IN c.to | MERGE (person:Person {name:personName}) MERGE (connection)-[:WAS_WRITTEN_TO]->(person))

//  create nodes of locations
MERGE (location:Location {name:c.location })
FOREACH (LocationName IN c.location | MERGE (location:Location {name:LocationName}) MERGE (connection)-[:LOCATED_IN]->(location))
// time
FOREACH (time IN c.date | MERGE (date:Date {name:time}) MERGE (connection)-[:WHEN]->(date))



// create inferred links
CALL apoc.load.json("file:///people.json") YIELD value AS people
UNWIND people AS p
WITH p
UNWIND p.connections as c // get inividual connection
WITH c // for each connection
// inferred link: connects with; double directions
MATCH (personFrom:Person {name:c.from}), (personTo:Person {name:c.to})
MERGE (personFrom)-[r:CONNECTED_WITH]-(personTo)
RETURN personFrom, personTo, r



'''
Question: Do we want to directly import csv to it?
'''


// # import csv


// # Try to do all in one?

''' 
# Query
'''

// contain "body"
MATCH (label:Label) WHERE label.name CONTAINS "body" 
// MATCH (connection:Connection) WHERE connection.label CONTAINS "body" RETURN connection
MATCH (connection:Connection)-[]->(label) 
RETURN label, connection
