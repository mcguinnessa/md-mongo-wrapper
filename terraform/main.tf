provider "aws" {
  version = "~> 2.7"
#  version = "~> 2.0"
  region  = "eu-west-2" # Setting my region to London. Use your own region here
#  access_key = ""
#  secret_key = ""
}


variable "mongo_user"  {
  description = "mongodb user name"
  type = string
  default = ""
}

variable "mongo_pass"  {
  description = "mongodb password"
  type = string
  default = ""
}

variable "mongo_url"  {
  description = "mongodb url"
  type = string
  default = ""
}

variable "docker_sha"  {
  description = "The SHA from the docker build"
  type = string
  default = ""
}

resource "aws_ecs_task_definition" "mongo_wrapper_task" {
  family                   = "mongo-wrapper-task" # Naming our first task
  container_definitions    = <<DEFINITION
  [
    {
      "name": "mongo-wrapper-task",
      "image": "mcguinnessa/md-mongo-wrapper@${var.docker_sha}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "name" : "api-port",
          "protocol" : "http",
          "appProtocol" : "http"
        }
      ],
      "memory": 512,
      "cpu": 256,
      "environment": [
      {
        "name": "MONGODB_USER",
        "value": "${var.mongo_user}"
      },
      {
        "name": "MONGODB_PASSWORD",
        "value": "${var.mongo_pass}"
      },
      {
        "name": "MONGODB_URI",
        "value": "${var.mongo_url}"
      },
      {
        "name": "SERVER_PORT",
        "value": "3000"
      }],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "monitor-logging-container",
          "awslogs-region": "eu-west-2",
          "awslogs-create-group": "true",
          "awslogs-stream-prefix": "mdwrap"
        }
      }
    }
  ]
  DEFINITION
  requires_compatibilities = ["FARGATE"] # Stating that we are using ECS Fargate
  network_mode             = "awsvpc"    # Using awsvpc as our network mode as this is required for Fargate
  memory                   = 512         # Specifying the memory our container requires
  cpu                      = 256         # Specifying the CPU our container requires
#  execution_role_arn       = "${aws_iam_role.ecsTaskExecutionRole2.arn}"
#  execution_role_arn       = "arn:aws:iam::182028175464:role/ecsTaskExecutionRole2"
#  execution_role_arn       = "arn:aws:iam::182028175464:role/AlexECSTaskExecutionRole"
  execution_role_arn       = "arn:aws:iam::637423404396:role/AlexECSTaskExecutionRole"
}


resource "aws_ecs_service" "mongo_wrapper_service" {
  name            = "mongo-wrapper-service"                             # Naming our first service
#  cluster         = "${aws_ecs_cluster.mongo_wrapper_cluster.id}"             # Referencing our created Cluster
  cluster         = "monitor-cluster"             # Referencing our created Cluster
  task_definition = "${aws_ecs_task_definition.mongo_wrapper_task.arn}" # Referencing the task our service will spin up
  launch_type     = "FARGATE"
  desired_count   = 1 # Setting the number of containers we want deployed to 3

  load_balancer {
    #target_group_arn = "${aws_lb_target_group.mongo_wrapper_target_group.arn}" # Referencing our target group
    #target_group_arn = "arn:aws:elasticloadbalancing:eu-west-2:182028175464:targetgroup/md-wrapper-target-group/6a556b45daff89af"
    #target_group_arn = "arn:aws:elasticloadbalancing:eu-west-2:637423404396:targetgroup/md-wrapper-target-group/a871166e6bb1772f"
    target_group_arn = "arn:aws:elasticloadbalancing:eu-west-2:637423404396:targetgroup/md-wrapper-target-group/0ca035cf0e66ca62"
    container_name   = "${aws_ecs_task_definition.mongo_wrapper_task.family}"
    container_port   = 3000 # Specifying the container port
  }

  network_configuration {
    subnets          = ["${aws_default_subnet.default_subnet_a.id}", "${aws_default_subnet.default_subnet_b.id}", "${aws_default_subnet.default_subnet_c.id}"]
    assign_public_ip = true                                                # Providing our containers with public IPs
    security_groups  = ["${aws_security_group.mongo_wrapper_service_security_group.id}"] # Setting the security group
  }
}

resource "aws_security_group" "mongo_wrapper_service_security_group" {
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Only allowing traffic in from the load balancer security group
    #security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
#    security_groups = ["sg-039063a37c674e76b"]
    #   MD LB SG     
    #security_groups = ["sg-05edc1b1e4b5cd1e2"]
    security_groups = ["sg-0df381f9e766dc9c4"]


  }

  egress {
    from_port   = 0 # Allowing any incoming port
    to_port     = 0 # Allowing any outgoing port
    protocol    = "-1" # Allowing any outgoing protocol
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
  }
}

# Providing a reference to our default VPC
resource "aws_default_vpc" "default_vpc" {
}

# Providing a reference to our default subnets
resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = "eu-west-2a"
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = "eu-west-2b"
}

resource "aws_default_subnet" "default_subnet_c" {
  availability_zone = "eu-west-2c"
}


