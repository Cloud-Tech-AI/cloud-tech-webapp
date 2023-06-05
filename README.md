# cloud-tech-webapp
Web Application for Cloud Tech

## Public Tenant
* default tenant
* no login required
* will be able to view landing page
* will be able to view content from all schemas

## Content Tenant (shared tenant)
* member (default users created under this schema)
* moderator (users can be created)
* hero (users can be created)

## TODO
* Short term
  * create a custom middleware that routes domain (member.localhost) to (localhost/member) make appropriate changes to settings.py
  * default redirect to landing page, ask to login in order to write blog
  * open home app only upon login (user should be able to write blogs here)
* Long term
  * create a simple form view to create tenant schema (create 3 schemas member/moderator/hero)
  * list the user specific blogs written upon login
